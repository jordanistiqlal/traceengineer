import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { useData } from '@/Contexts/DataContext';
import dataEngineer from '../data/engineer.json'
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

function ChangeMapView({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView([center.latitude, center.longitude], zoom);
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function Home({response=[], markers = [], zoom = 11 }) {
    const { selectedData } = useData();
    markers = selectedData?.titik_koordinat
    const markerList = useMemo(() => markers?.map(m => ({ ...m, latitude: Number(m.latitude), longitude: Number(m.longitude) })), [markers]);
    const center = useMemo(() => markerList?.length > 0 ? { latitude: markerList[0].latitude, longitude: markerList[0].longitude } : { latitude: -6.193125, longitude: 106.821810 }, [markerList] ); 
    
    return (
      <>
        <Head title='Track'/>
        <div style={{ height: '100vh', width: '100%' }}>
          <MapContainer center={[center.latitude, center.longitude]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeMapView center={center} zoom={zoom} />
            {markerList?.map(m => (
              <Marker key={m.id || `marker-${m.latitude}-${m.longitude}`} position={[m.latitude, m.longitude]}>
                <Popup>
                  <strong>{m.title}</strong><br />
                  Latitude: {m.latitude}, Longitude: {m.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </>
    );
}

Home.layout = page => <MainLayout children={page} sidebarData={page.props.response} />; // page.props.sidebarData