import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { useToastStore } from '../../stores/toastStore';
import { MapPin, AlertCircle } from 'lucide-react';

mapboxgl.accessToken = 'pk.eyJ1IjoicmlkZWh1YmFwcCIsImEiOiJjbGFiY2RlZjAxMjM0M3FxdGV4YW01em01In0.9c5wKUJGiDsFeGKP31TD9w';

interface MapProps {
  onLocationSelect?: (longitude: number, latitude: number) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [lng, setLng] = useState(-74.006);
  const [lat, setLat] = useState(40.7128);
  const [zoom, setZoom] = useState(12);
  const { addToast } = useToastStore();

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (Capacitor.isPluginAvailable('Geolocation')) {
          const position = await Geolocation.getCurrentPosition();
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLng(position.coords.longitude);
              setLat(position.coords.latitude);
            },
            () => {
              addToast({
                title: 'Location Error',
                message: 'Unable to retrieve your location',
                type: 'error',
                icon: <AlertCircle size={20} />,
              });
            }
          );
        }
      } catch (error) {
        addToast({
          title: 'Location Error',
          message: 'Unable to retrieve your location',
          type: 'error',
          icon: <AlertCircle size={20} />,
        });
      }
    };

    getUserLocation();
  }, [addToast]);

  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      marker.current = new mapboxgl.Marker({
        color: '#0066FF',
        draggable: true,
      })
        .setLngLat([lng, lat])
        .addTo(map.current);

      map.current.on('move', () => {
        if (!map.current) return;
        const center = map.current.getCenter();
        setLng(Number(center.lng.toFixed(4)));
        setLat(Number(center.lat.toFixed(4)));
        setZoom(Number(map.current.getZoom().toFixed(2)));
      });

      map.current.on('click', (e) => {
        if (marker.current) {
          marker.current.setLngLat(e.lngLat);
          if (onLocationSelect) {
            onLocationSelect(e.lngLat.lng, e.lngLat.lat);
          }
        }
      });

      marker.current.on('dragend', () => {
        if (marker.current && onLocationSelect) {
          const lngLat = marker.current.getLngLat();
          onLocationSelect(lngLat.lng, lngLat.lat);
        }
      });
    }
  }, [lng, lat, zoom, onLocationSelect]);

  useEffect(() => {
    if (map.current && marker.current) {
      marker.current.setLngLat([lng, lat]);
      map.current.flyTo({
        center: [lng, lat],
        zoom: zoom,
        essential: true,
      });
    }
  }, [lng, lat, zoom]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="map-container" />
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full px-4 py-2 text-sm flex items-center">
          <MapPin size={16} className="text-primary-500 mr-2" />
          <span>
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Map;