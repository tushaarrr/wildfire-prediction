"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  latitude: number;
  longitude: number;
  riskLevel: string;
}

export default function MapComponent({ latitude, longitude, riskLevel }: MapComponentProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <div className="text-sm">
            <p className="font-medium">Risk Level: {riskLevel}</p>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
} 