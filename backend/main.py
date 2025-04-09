from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import openai
import os
import requests
from dotenv import load_dotenv

# Define PredictionInput model
class PredictionInput(BaseModel):
    temperature: float
    humidity: float
    windSpeed: float
    rainfall: float
    latitude: float
    longitude: float

# Load environment variables from .env file
# .env file should contain: OPENAI_API_KEY=your-api-key
load_dotenv()

app = FastAPI()

# Update CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔁 Load model
model = joblib.load("wildfire_model.pkl")
openai.api_key = os.getenv("OPENAI_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

@app.get("/weather")
async def get_weather(city: str = None, lat: float = None, lon: float = None):
    try:
        if not OPENWEATHER_API_KEY:
            raise HTTPException(status_code=500, detail="OpenWeather API key not configured")

        # Build API URL
        if city:
            url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        elif lat and lon:
            url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
        else:
            raise HTTPException(status_code=400, detail="Either city or lat/lon must be provided")

        # Make API request
        response = requests.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch weather data")

        data = response.json()
        
        # Extract required data
        return {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "windSpeed": data["wind"]["speed"] * 3.6,  # Convert m/s to km/h
            "rainfall": data.get("rain", {}).get("1h", 0),  # mm in last hour
            "latitude": data["coord"]["lat"],
            "longitude": data["coord"]["lon"]
        }
    except Exception as e:
        print(f"Weather API error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(data: PredictionInput):
    try:
        # Validate input ranges
        if not (0 <= data.temperature <= 60):
            raise HTTPException(status_code=400, detail="Temperature must be between 0 and 60°C")
        if not (0 <= data.humidity <= 100):
            raise HTTPException(status_code=400, detail="Humidity must be between 0 and 100%")
        if not (0 <= data.windSpeed <= 100):
            raise HTTPException(status_code=400, detail="Wind speed must be between 0 and 100 km/h")
        if not (0 <= data.rainfall <= 500):
            raise HTTPException(status_code=400, detail="Rainfall must be between 0 and 500 mm")
        
        # Calculate risk factors
        temp_factor = min((data.temperature / 45) * 100, 100)
        humidity_factor = (1 - (data.humidity / 100)) * 100
        wind_factor = min((data.windSpeed / 50) * 100, 100)
        rain_factor = (1 - (data.rainfall / 100)) * 100

        # Calculate overall risk score (0-100)
        risk_score = (0.4 * temp_factor + 0.3 * humidity_factor + 0.2 * wind_factor + 0.1 * rain_factor)
        
        # Determine risk level
        risk_level = "High" if risk_score > 60 else "Low"
        
        # Calculate confidence score (more realistic - between 50-70%)
        base_confidence = 50  # Start with a base confidence of 50%
        additional_confidence = min((risk_score / 100) * 20, 20)  # Add up to 20% more based on risk score
        confidence_score = round(base_confidence + additional_confidence, 1)  # Total confidence between 50-70%

        # Calculate factor contributions
        factor_total = temp_factor + humidity_factor + wind_factor + rain_factor
        temperature_impact = round((temp_factor / factor_total) * 100, 1)
        humidity_impact = round((humidity_factor / factor_total) * 100, 1)
        wind_impact = round((wind_factor / factor_total) * 100, 1)
        rain_impact = round((rain_factor / factor_total) * 100, 1)

        return {
            "risk": risk_level,
            "confidence": confidence_score,
            "factors": {
                "temperature": temperature_impact,
                "humidity": humidity_impact,
                "windSpeed": wind_impact,
                "rainfall": rain_impact
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(data: Request):
    try:
        body = await data.json()
        message = body["message"]
        prediction_result = body.get("predictionResult", {})
        user_inputs = body.get("userInputs", {})

        # Format the prediction data for the prompt
        prediction_summary = f"""
Risk Level: {prediction_result.get('risk', 'Unknown')}
Confidence: {prediction_result.get('confidence', 0)}%

Current Conditions:
- Temperature: {user_inputs.get('temperature', 'N/A')}°C
- Humidity: {user_inputs.get('humidity', 'N/A')}%
- Wind Speed: {user_inputs.get('windSpeed', 'N/A')} km/h
- Rainfall: {user_inputs.get('rainfall', 'N/A')} mm
- Location: {user_inputs.get('latitude', 'N/A')}, {user_inputs.get('longitude', 'N/A')}

Contributing Factors:
"""
        for factor, value in prediction_result.get('factors', {}).items():
            prediction_summary += f"- {factor}: {value}%\n"

        prompt = f"""Based on this wildfire prediction data:
{prediction_summary}

User question: {message}

Please respond like a helpful wildfire risk advisor, focusing on the specific data provided."""

        if not openai.api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a wildfire risk expert. Provide clear, actionable advice based on the prediction data."},
                    {"role": "user", "content": prompt}
                ]
            )
            return {"message": response.choices[0].message.content}
        except Exception as e:
            print(f"OpenAI API error: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to get AI response")

    except Exception as e:
        print(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
