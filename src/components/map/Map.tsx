import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { useToastStore } from '../../stores/toastStore';
import { MapPin, AlertCircle, Crosshair, Palette } from 'lucide-react';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmVkb3NlZXZzbSIsImEiOiJjbTl6czltNzcwbmd4MmlzZDNhaGR5NWdoIn0.Xqp592659X06xHAJLbcrAQ';

const mapStyles = [
  { id: 'light', name: 'Light', url: 'mapbox://styles/mapbox/light-v11' },
  { id: 'dark', name: 'Dark', url: 'mapbox://styles/mapbox/dark-v11' },
  { id: 'streets', name: 'Streets', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'satellite', name: 'Satellite', url: 'mapbox://styles/mapbox/satellite-streets-v12' },
  { id: 'navigation', name: 'Navigation', url: 'mapbox://styles/mapbox/navigation-night-v1' }
];

interface MapProps {
  onLocationSelect?: (longitude: number, latitude: number, address?: string) => void;
  showDriverLocation?: boolean;
}

const Map = ({ onLocationSelect, showDriverLocation }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const driverMarker = useRef<mapboxgl.Marker | null>(null);
  const carMarkers = useRef<mapboxgl.Marker[]>([]);
  const [lng, setLng] = useState(-74.006);
  const [lat, setLat] = useState(40.7128);
  const [zoom, setZoom] = useState(12);
  const [showStyles, setShowStyles] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(mapStyles[2]);
  const { addToast } = useToastStore();

  const createCarMarker = (longitude: number, latitude: number) => {
    if (!map.current) return null;

    const el = document.createElement('div');
    el.className = 'car-marker';
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.backgroundImage = 'url(https://img.icons8.com/material-rounded/96/0066FF/car.png)';
    el.style.backgroundSize = 'cover';
    el.style.backgroundRepeat = 'no-repeat';

    const marker = new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    return marker;
  };

  const animateRandomCars = () => {
    if (!map.current) return;

    // Clear existing car markers
    carMarkers.current.forEach(marker => marker.remove());
    carMarkers.current = [];

    // Create 3-4 random cars around the user's location
    const numCars = Math.floor(Math.random() * 2) + 3; // Random number between 3-4

    for (let i = 0; i < numCars; i++) {
      // Random offset from user's location (within ~500m)
      const offsetLng = (Math.random() - 0.5) * 0.01;
      const offsetLat = (Math.random() - 0.5) * 0.01;
      
      const carMarker = createCarMarker(lng + offsetLng, lat + offsetLat);
      if (carMarker) {
        carMarkers.current.push(carMarker);

        // Animate the car
        let progress = 0;
        const animateCar = () => {
          progress += 0.01;
          if (progress >= 1) {
            carMarker.remove();
            carMarkers.current = carMarkers.current.filter(m => m !== carMarker);
            return;
          }

          // Move the car in a random direction
          const newLng = (lng + offsetLng) + Math.sin(progress * Math.PI) * 0.001;
          const newLat = (lat + offsetLat) + Math.cos(progress * Math.PI) * 0.001;
          carMarker.setLngLat([newLng, newLat]);

          requestAnimationFrame(animateCar);
        };

        animateCar();
      }
    }
  };

  useEffect(() => {
    // Start periodic car animations
    const carInterval = setInterval(animateRandomCars, 4000);
    return () => clearInterval(carInterval);
  }, [lng, lat]);

  const handleLocationFound = async (longitude: number, latitude: number) => {
    setLng(longitude);
    setLat(latitude);

    if (marker.current) {
      marker.current.setLngLat([longitude, latitude]);
    }

    if (map.current) {
      map.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true,
      });
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      // Check if features array exists and has items before accessing
      const address = data.features && data.features.length > 0 
        ? data.features[0].place_name 
        : 'Address not found';
      
      if (onLocationSelect) {
        onLocationSelect(longitude, latitude, address);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      if (onLocationSelect) {
        onLocationSelect(longitude, latitude, 'Address not found');
      }
    }
  };

  const getCurrentLocation = async () => {
    try {
      if (Capacitor.isPluginAvailable('Geolocation')) {
        const position = await Geolocation.getCurrentPosition();
        handleLocationFound(position.coords.longitude, position.coords.latitude);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleLocationFound(position.coords.longitude, position.coords.latitude);
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

  const changeMapStyle = (style: typeof mapStyles[0]) => {
    if (map.current) {
      map.current.setStyle(style.url);
      setCurrentStyle(style);
      setShowStyles(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: currentStyle.url,
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: 'Search for a location',
      });

      geocoder.on('result', (e) => {
        const [longitude, latitude] = e.result.center;
        handleLocationFound(longitude, latitude);
      });

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
          handleLocationFound(e.lngLat.lng, e.lngLat.lat);
        }
      });

      marker.current.on('dragend', () => {
        if (marker.current) {
          const lngLat = marker.current.getLngLat();
          handleLocationFound(lngLat.lng, lngLat.lat);
        }
      });
    }
  }, [lng, lat, zoom]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="map-container" />
      <div className="absolute bottom-30 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full px-4 py-2 text-sm flex items-center">
          <MapPin size={16} className="text-primary-500 mr-2" />
          <span>
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={getCurrentLocation}
          className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label="Get current location"
        >
          <Crosshair size={20} className="text-primary-500" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowStyles(!showStyles)}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Change map style"
          >
            <Palette size={20} className="text-primary-500" />
          </button>
          {showStyles && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1">
              {mapStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => changeMapStyle(style)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {style.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;