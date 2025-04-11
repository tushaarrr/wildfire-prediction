Bhai yeh le **full copy-paste-ready** `README.md` including `requirements.txt` aur virtual environment instructions. Seedha GitHub pe daal de — sab kuch **professional, clean, aur detailed** hai. 🔥

---

### ✅ Final `README.md` for FireSight Wildfire Prediction

```markdown
# 🔥 FireSight – AI-Powered Wildfire Risk Prediction

**FireSight** is a full-stack AI-powered platform that predicts wildfire risk using real-time weather data like temperature, humidity, wind speed, rainfall, and geolocation (latitude & longitude). The system combines machine learning with weather APIs and interactive dashboards to visualize fire threats and provide actionable insights.

---

## 🌎 Dataset Sources

- **U.S. Forest Service – FPA-FOD (Fire Occurrence Dataset)**  
  🔗 https://doi.org/10.2737/RDS-2013-0009.4

- **NASA FIRMS Wildfire Archive (2000–2014)**  
  🔗 https://firms.modaps.eosdis.nasa.gov/download/

---

## 🛠 How to Run the Project

### 1. 🖥 Frontend (Next.js + Tailwind CSS)
```bash
cd app
npm install
npm run dev
```

> App will run at: `http://localhost:3000`

---

### 2. ⚙️ Backend (FastAPI + ML model)

#### (a) Create & activate a virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### (b) Install dependencies
```bash
pip install -r requirements.txt
```


```

#### (c) Run the FastAPI backend
```bash
uvicorn main:app --reload --port 8001
```

> API will run at: `http://localhost:8001`

---

## 🧠 ML Model Summary

- **Algorithm:** Random Forest Classifier  
- **Input Features:** temperature, humidity, wind speed, rainfall, latitude, longitude  
- **Accuracy:** ~60–70% (on real-world weather data)  
- **Limitations:** Model does not account for human behavior or sudden local events (e.g., campfires, dry lightning)

---

## 📊 Key Features

- 🌦️ Live Weather API integration (OpenWeather)
- 🧠 ML model prediction with risk level and confidence
- 📈 Graphs for temperature impact & risk distribution
- 🗺️ Map-based fire risk visualization
- 🤖 AI Chat assistant (OpenAI GPT-3.5)
- 📰 Climate-related news widget (GNews API)

---

## 👥 Project Members

- **Tushar Shandilya** – AI Model, FastAPI Backend, Frontend Integration  
- **Nandini Goyal** – UI/UX Design, Data Cleaning, Report & Testing  

> 🏫 Douglas College – CSIS 4260 (AI Applications), Winter 2025

---

## 🚀 Live Demo

🔗 [firesightapp.vercel.app](https://firesightapp.vercel.app)

---



## 🙏 Acknowledgements

- NASA FIRMS & US Forest Service for providing open wildfire datasets  
- OpenWeather API for live weather integration  
- OpenAI for language-based AI insights  
```

---

