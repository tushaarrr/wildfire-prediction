import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, MapPin, Search } from "lucide-react"
import { motion } from "@/components/motion"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WeatherModalProps {
  isOpen: boolean
  onClose: () => void
  onWeatherData: (data: any) => void
}

const popularCities = [
  // Australia - High Fire Risk Cities
  "Sydney, AU",
  "Melbourne, AU",
  "Perth, AU",
  "Adelaide, AU",
  "Brisbane, AU",

  // United States - High Fire Risk Cities
  "Los Angeles, US",
  "Phoenix, AZ, US",
  "Sacramento, CA, US",
  "Las Vegas, NV, US",
  "San Diego, CA, US",
  "Austin, TX, US",
  "Denver, CO, US",

  // Mediterranean - High Fire Risk
  "Athens, GR",
  "Rome, IT",
  "Barcelona, ES",
  "Marseille, FR",
  "Istanbul, TR",

  // India - Major Cities
  "New Delhi, IN",
  "Mumbai, IN",
  "Bangalore, IN",
  "Chennai, IN",
  "Hyderabad, IN",

  // Other Global Cities
  "Dubai, AE",  // Hot Desert Climate
  "Cairo, EG",  // Hot Desert Climate
  "Tokyo, JP",
  "Singapore, SG",
  "London, GB",
  "Paris, FR",
  "Berlin, DE",
  "Toronto, CA",
]

// Sort cities alphabetically
.sort((a, b) => a.localeCompare(b))

export function WeatherModal({ isOpen, onClose, onWeatherData }: WeatherModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCitySelect = async (city: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8001/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      onWeatherData(data);
      onClose();
    } catch (error) {
      console.error('Weather fetch error:', error);
      alert('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setIsLoading(true);
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const response = await fetch(
        `http://localhost:8001/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      onWeatherData(data);
      onClose();
    } catch (error) {
      console.error('Location/weather fetch error:', error);
      alert('Failed to get location or fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/80 border-white/10 backdrop-blur-xl text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select Location</DialogTitle>
          <DialogDescription className="text-white/60">
            Choose a city or use your current location to get weather data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-black/50 border-white/10 text-white placeholder:text-white/40 focus:border-orange-500/50 focus:ring-orange-500/20"
            />
            <Button
              onClick={handleUseCurrentLocation}
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use My Location
                </>
              )}
            </Button>
          </div>

          <ScrollArea className="h-[300px] rounded-md border border-white/10 p-4">
            <div className="space-y-2">
              {filteredCities.map((city) => (
                <Button
                  key={city}
                  variant="ghost"
                  onClick={() => handleCitySelect(city)}
                  className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {city}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
} 