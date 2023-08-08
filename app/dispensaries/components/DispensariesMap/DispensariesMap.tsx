'use client';

import React, { useState, createContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoMdLocate } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { User } from '@prisma/client';
import dynamic from 'next/dynamic';

import { setUserCoordinates } from '@/store/features/userCoordinatesSlice';
import { geoIpLocation, nearbyDispensary } from '@/types/interfaces';
import DispensariesMapSkeleton from './DispensariesMapSkeleton';

const DispensariesMapLeaflet = dynamic(
  () => import('./DispensariesMapLeaflet'),
  {
    ssr: false,
    loading: () => <DispensariesMapSkeleton />,
  }
);

type Props = { user: User | null };

type Geolocation = {
  lat: number;
  lon: number;
};

export const CoordinatesContext = createContext({});

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
    const dispensaries = (await res.json()) as {
      dispensaries: nearbyDispensary[];
    };
    return dispensaries.dispensaries;
  } else {
    return [];
  }
};

const getGeolocation = (): Promise<Geolocation> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
    const data = (await res.json()) as Geolocation[];
    return { lat: data[0].lat, lon: data[0].lon };
  }

  const res = await fetch('/api/user/locate');
  const data = (await res.json()) as geoIpLocation;

  return {
    lat: data.location.lat,
    lon: data.location.lon,
  };
};

const DispensariesMap = (props: Props) => {
  const [canGetGeolocation, setGetGeolocation] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    data: roughCoordinates,
    isLoading: roughCoordinatesLoading,
    error: roughCoordinatesError,
  } = useQuery({
    queryKey: ['rough-coordinates'],
    queryFn: () => getIpGeolocation(props.user?.location),
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
      'nearby-dispensaries',
      [coordinates?.lat, coordinates?.lon, props.user?.location],
    ],
    queryFn: () =>
      getNearbyDispensaries(
        coordinates?.lat ?? roughCoordinates?.lat,
        coordinates?.lon ?? roughCoordinates?.lon,
        props.user?.location
      ),
    enabled: Boolean(
      (coordinates?.lat && coordinates.lon) ||
        (roughCoordinates?.lon && roughCoordinates?.lat) ||
        props.user?.location
    ),
  });

  useEffect(() => {
    if (coordinates) {
      dispatch(setUserCoordinates({ ...coordinates }));
    }
    if (roughCoordinates && !coordinates) {
      dispatch(setUserCoordinates({ ...roughCoordinates }));
    }
  }, [coordinates, roughCoordinates, dispatch]);

  if (coordinatesError || roughCoordinatesError)
    throw new Error('No coordinates found.');

  return (
    <CoordinatesContext.Provider
      value={{
        lat: coordinates?.lat || roughCoordinates?.lat,
        lon: coordinates?.lon || roughCoordinates?.lon,
        error: dispensariesError,
        loading: roughCoordinatesLoading || dispensariesLoading,
        city: props.user?.location == 'Earth' ? null : props.user?.location,
        dispensaries: dispensaries,
      }}
    >
      <button
        className={`absolute z-30 text-green-700 right-10 top-[6.5rem] ${
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
