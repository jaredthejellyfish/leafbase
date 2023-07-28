'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DispensaryMapSkeleton from './DispensaryMapSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Dispensary } from '@prisma/client';
import Link from 'next/link';
import StarRating from '@/components/StarRating/StarRating';

type Props = {
  lat: number;
  lon: number;
  address: string;
  dispensary: Dispensary;
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

const DispensaryMap = (props: Props) => {
  const [marker, setMarker] = useState<React.ReactNode>(undefined);
  const currentTheme = useSelector((state: RootState) => state.theme).theme;
  const mapThemeUrl = currentTheme === 'dark' ? 'dark_all' : 'light_all';

  useEffect(() => {
    if (props.lat === 0 && props.lon === 0) return;
    import('leaflet').then((mod) =>
      setMarker(
        <Marker
          position={[props.lat, props.lon]}
          icon={
            new mod.Icon({
              iconUrl:
                'https://inthesk.net/wp-content/uploads/2023/06/Circunferencia.png',
              iconSize: [20, 14.5],
            })
          }
        >
          {props.dispensary && (
            <Popup
              className="z-50"
              autoClose={true}
              closeOnEscapeKey={true}
              closeButton={false}
              closeOnClick={true}
            >
              <Link
                href={`/dispensaries/${props.dispensary.slug}`}
                className="text-sm font-bold"
              >
                {props.dispensary.name}
              </Link>
              <br />
              <span className="flex flex-row -ml-1 scale-95 gap-x-2">
                {4.2}
                <StarRating className={'text-zinc-900'} rating={4.5} />
              </span>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  props.dispensary.address || '/dispensaries'
                )}`}
                className="overflow-hidden text-zinc-400 hover:text-green-400 overflow-ellipsis"
              >
                <span className="text-xs text-zinc-900">
                  {props.dispensary.address}
                </span>
              </Link>
            </Popup>
          )}
        </Marker>
      )
    );
  }, [props.lat, props.lon, props.dispensary]);

  if (props.lat === 0 && props.lon === 0) return null;

  return typeof window !== "undefined" || marker ? (
    <div className="h-[194px] md:h-[264px] relative z-0 flex flex-col w-full p-3 shadow-md rounded-xl dark:bg-zinc-900">
      <MapContainer
        className="h-[170px] md:h-[240px] w-full relative rounded-xl bg--gray-400"
        center={[props.lat, props.lon]}
        zoom={15}
        placeholder={<DispensaryMapSkeleton />}
      >
        <TileLayer
          attribution="lolkeklmao"
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/${mapThemeUrl}/{z}/{x}/{y}{r}.png`}
        />

        {marker}
      </MapContainer>
    </div>
  ) : (
    <DispensaryMapSkeleton />
  );
};

export default DispensaryMap;
