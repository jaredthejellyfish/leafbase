import React, { useContext } from 'react';
import { CoordinatesContext } from './DispensariesMap';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Icon } from 'leaflet';
import DispensariesMapSkeleton from './DispensariesMapSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  {
    ssr: false,
  }
);

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

type Coordinates = {
  lat: number;
  lon: number;
  error: string;
  loading: boolean;
  city: string;
  dispensaries: nearbyDispensary[];
};

type nearbyDispensary = {
  id: string;
  latitude: number;
  longitude: number;
  slug: string;
  name: string;
  city: string;
};

const DispensariesMapLeaflet = () => {
  const {
    lat,
    lon,
    error,
    loading,
    dispensaries: dispensaries,
  } = useContext(CoordinatesContext) as Coordinates;

  const currentTheme = useSelector((state: RootState) => state.theme).theme;
  const mapThemeUrl = currentTheme === 'dark' ? 'dark_all' : 'light_all';

  if (!window) return null;
  if (dispensaries && dispensaries?.length < 1) return null;
  if (error) return <p>There was an error!</p>;
  if (loading) return <DispensariesMapSkeleton />;

  return (
    <div className="relative z-0 flex flex-col w-[99vw] p-3 m-1 shadow-md h-screen-bar rounded-xl dark:bg-zinc-900">
      {typeof window !== undefined && (
        <MapContainer
          className="relative w-full h-full rounded-xl bg--gray-400"
          center={[lat || 0, lon || 0]}
          zoom={13}
          placeholder={<DispensariesMapSkeleton />}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.basemaps.cartocdn.com/${mapThemeUrl}/{z}/{x}/{y}{r}.png`}
          />
          {lat && lon && (
            <Marker
              position={[lat, lon]}
              icon={
                new Icon({
                  iconUrl:
                    'https://cdn-icons-png.flaticon.com/512/9101/9101314.png',
                  iconSize: [20, 20],
                })
              }
            ></Marker>
          )}

          {dispensaries.map((dispensary) => (
            <Marker
              key={dispensary.id}
              position={[dispensary.latitude, dispensary.longitude]}
              icon={
                new Icon({
                  iconUrl:
                    'https://inthesk.net/wp-content/uploads/2023/06/Circunferencia.png',
                  iconSize: [20, 14.5],
                  className: 'opacity-75',
                })
              }
            >
              <Popup>
                <Link href={`/dispensaries/${dispensary.slug}`}>
                  {dispensary.name}
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default DispensariesMapLeaflet;