/* eslint-disable react-hooks/exhaustive-deps */
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { BiCar, BiMapPin, BiTargetLock } from 'react-icons/bi';

import personIcon from './marker-icon.png';
import carIconMarker from './marker-car.png';
import * as S from './styles.js';

function App() {

  const commonIconProps = {
    iconSize: [25, 41],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  };

  const carIcon = L.icon({
    iconUrl: carIconMarker,
    ...commonIconProps
  });

  const userIcon = L.icon({
    iconUrl: personIcon,
    ...commonIconProps
  });

  const [userPosition, setUserPosition] = useState({});
  const [savedPosition, setSavedPosition] = useState({});
  const [currentPosition, setCurrentPosition] = useState({
    lat: null,
    lng: null
  });

  const setPosition = (position) => {
    setUserPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  const getUserPosition = () => {
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
    localStorage.setItem('wimc-position', JSON.stringify({ lat: userPosition.lat, lng: userPosition.lng }));
    setSavedPosition({ lat: userPosition.lat, lng: userPosition.lng });
  }

  const showCarPosition = () => {
    if (savedPosition.lat && savedPosition.lng) {
      setCurrentPosition({
        lat: savedPosition.lat,
        lng: savedPosition.lng
      })
    }
  }

  const saveCurrentPosition = () => {
    setCurrentPosition({
      lat: userPosition.lat,
      lng: userPosition.lng
    })
  }

  const showUserPosition = () => {
    saveCurrentPosition();
  }

  useEffect(() => {
    if (userPosition.lat && userPosition.lng) {
      saveCurrentPosition();
    }
  }, [userPosition]);

  useEffect(() => {
    getUserPosition();
    fetchSavedPosition();
  }, []);

  if(currentPosition.lat === null || currentPosition.lng === null) {
    return <p>Aguardando localização</p>
  }

  return (
    <S.Container>
      <S.ActionsButton>

        <S.Button onClick={savePosition}>
          <BiMapPin />  
        </S.Button>

        <S.Button onClick={showCarPosition}>
          <BiCar />    
        </S.Button>
      
        <S.Button onClick={showUserPosition}>
          <BiTargetLock />    
        </S.Button>

      </S.ActionsButton>

      <MapContainer 
        key={JSON.stringify([currentPosition.lat, currentPosition.lng])}
        center={[currentPosition.lat, currentPosition.lng]} 
        zoom={20}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {currentPosition?.lat && 
        currentPosition?.lat && 
          <Marker position={[currentPosition.lat, currentPosition.lng]} icon={userIcon} />
        }
       {savedPosition?.lat && 
        savedPosition?.lat && 
          <Marker position={[savedPosition.lat, savedPosition.lng]} icon={carIcon} />
        }


      </MapContainer>

    </S.Container>
  );
}

export default App;
