'use client';

import React, { useState, createContext } from 'react';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import DispensariesMapSkeleton from './DispensariesMapSkeleton';
import { IoMdLocate } from 'react-icons/io';

const DispensariesMapLeaflet = dynamic(
  () => import('./DispensariesMapLeaflet'),
  {
    ssr: false,
    loading: () => <DispensariesMapSkeleton />,
  }
);

type Props = { user: User };

export const CoordinatesContext = createContext({});

type nearbyDispensary = {
  id: string;
  latitude: number;
  longitude: number;
  slug: string;
  name: string;
  city: string;
};

const getNearbyDispensaries = async (
  lat?: number,
  lon?: number,
  city?: string
) => {
  const res = await fetch(`/api/dispensaries/nearby`, {
    method: 'POST',
    body: JSON.stringify({
      lat: lat,
      lon: lon,
      city: city,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const dispensaries = await res.json();
    return dispensaries.dispensaries as nearbyDispensary[];
  } else {
    return [];
  }
};

const getGeolocation = (): Promise<Geolocation> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(error.message));
        }
      );
    } else {
      resolve({
        lat: 0,
        lon: 0,
      });
    }
  });
};

const getIpGeolocation = async (city?: string): Promise<Geolocation> => {
  if (city) {
    const res = await fetch(`https://geocode.maps.co/search?q=${city}`);
    const data = await res.json();
    return { lat: data[0].lat, lon: data[0].lon };
  }

  const res = await fetch('http://ip-api.com/json');
  const data = await res.json();

  return {
    lat: data.lat,
    lon: data.lon,
  };
};

type Geolocation = {
  lat: number;
  lon: number;
};

const DispensariesMap = (props: Props) => {
  const [canGetGeolocation, setGetGeolocation] = useState<boolean>(false);

  const {
    data: roughCoordinates,
    isLoading: roughCoordinatesLoading,
    error: roughCoordinatesError,
  } = useQuery({
    queryKey: ['rough-coordinates'],
    queryFn: () => getIpGeolocation(props.user.location),
  });

  const {
    data: coordinates,
    isLoading: coordinatesLoading,
    error: coordinatesError,
  } = useQuery<Geolocation>({
    queryKey: ['coordinates'],
    queryFn: getGeolocation,
    enabled: canGetGeolocation,
  });

  const {
    data: dispensaries,
    isLoading: dispensariesLoading,
    error: dispensariesError,
  } = useQuery({
    queryKey: [
      'nearby-dispenaries',
      [coordinates?.lat, coordinates?.lon, props.user.location],
    ],
    queryFn: () =>
      getNearbyDispensaries(
        coordinates?.lat,
        coordinates?.lon,
        props.user.location
      ),
    enabled: Boolean(
      (coordinates?.lat && coordinates.lon) || props.user.location
    ),
  });

  if (coordinatesError || roughCoordinatesError) return <p>There was an error!</p>;

  return (
    <CoordinatesContext.Provider
      value={{
        lat: coordinates?.lat || roughCoordinates?.lat,
        lon: coordinates?.lon || roughCoordinates?.lon,
        error: dispensariesError,
        loading: roughCoordinatesLoading || dispensariesLoading,
        city: props.user.location == 'Earth' ? null : props.user.location,
        dispensaries: dispensaries,
      }}
    >
        <button
          className={`absolute z-30 text-green-700 right-10 top-28 ${
            coordinatesLoading &&
            canGetGeolocation &&
            'bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 animate-pulse'
          }`}
          onClick={() => setGetGeolocation(!canGetGeolocation)}
          disabled={!coordinates ? false : true}
        >
          <IoMdLocate size={40} />
        </button>
      <DispensariesMapLeaflet />
    </CoordinatesContext.Provider>
  );
};

export default DispensariesMap;
