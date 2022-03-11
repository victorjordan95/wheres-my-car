/* eslint-disable react-hooks/exhaustive-deps */
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import personIcon from './person-icon.svg';
import * as S from './styles.js';

function App() {

  const myIcon = L.icon({
    iconUrl: personIcon,
    iconSize: [48,48],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
});

  const [savedPosition, setSavedPosition] = useState({});
  const [currentPosition, setCurrentPosition] = useState({
    lat: null,
    lng: null
  });

  const setPosition = (position) => {
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(setPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const fetchSavedPosition = () => {
    const savedPosition = localStorage.getItem('wimc-position');
    if (savedPosition) {
      setSavedPosition(JSON.parse(savedPosition));
    }
  }

  const savePosition = () => {
    localStorage.setItem('wimc-position', JSON.stringify({ lat: currentPosition.lat, lng: currentPosition.lng }));
    setSavedPosition({ lat: currentPosition.lat, lng: currentPosition.lng });
  }


  useEffect(() => {
    getCurrentPosition();
    fetchSavedPosition();
  }, []);

  if(currentPosition.lat === null || currentPosition.lng === null) {
    return <p>Aguardando localização</p>
  }

  return (
    <S.Container>
      <S.Button onClick={savePosition}>Salvar localização</S.Button>

      <MapContainer 
        center={[currentPosition.lat, currentPosition.lng]} 
        zoom={20}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       {savedPosition?.lat && 
        savedPosition?.lat && 
        <Marker position={[savedPosition.lat, savedPosition.lng]} />
        }
        {currentPosition?.lat && 
        currentPosition?.lat && 
        <Marker position={[currentPosition.lat, currentPosition.lng]} icon={myIcon} />
        }
      </MapContainer>

    </S.Container>
  );
}

export default App;
