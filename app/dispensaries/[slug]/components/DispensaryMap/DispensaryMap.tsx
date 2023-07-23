'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import DispensaryMapSkeleton from './DispensaryMapSkeleton';
import { useMapEvent } from 'react-leaflet';

type Props = {
  lat: number;
  lon: number;
  address: string;
};

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

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

const DispensaryMap = (props: Props) => {
  const [marker, setMarker] = useState<React.ReactNode>(undefined);

  useEffect(() => {
    if (props.lat === 0 && props.lon === 0) return;
    import('leaflet').then((mod) =>
      setMarker(
        <Marker
          position={[props.lat, props.lon]}
          icon={
            new mod.Icon({
              iconUrl: 'map-marker.svg',
              iconSize: [25, 25],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )
    );
  }, [props.lat, props.lon]);

  if (props.lat === 0 && props.lon === 0) return null;

  return typeof window !== undefined || marker ? (
    <div className="h-[194px] md:h-[264px]  relative z-0 flex flex-col w-full p-3 shadow-md rounded-xl dark:bg-zinc-900">
      <MapContainer
        className="h-[170px] md:h-[240px] w-full relative rounded-xl bg--gray-400"
        center={[props.lat, props.lon]}
        zoom={15}
        placeholder={<DispensaryMapSkeleton />}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <SetViewOnClick />

        {marker}
      </MapContainer>
    </div>
  ) : (
    <DispensaryMapSkeleton />
  );
};

export default DispensaryMap;
