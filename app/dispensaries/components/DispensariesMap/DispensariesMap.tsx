'use client';

import React, { useState, createContext } from 'react';
import { User } from '@prisma/client';
import DispensariesMapLeaflet from './DispensariesMapLeaflet';

type Props = { user: User };

export const CoordinatesContext = createContext({});

const DispensariesMap = (props: Props) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [error, setError] = useState<string>('no error');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGeolocation = () => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      // Get the user's geolocation
      console.log('Getting geolocation...');
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          // Success: set latitude and longitude states
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setIsLoading(false);
          console.log(position)
        },
        (error) => {
          // Error: set error state
          setIsLoading(false);
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <CoordinatesContext.Provider
      value={{
        lat: latitude,
        lon: longitude,
        error: error,
        loading: isLoading,
        city: props.user.location == 'Earth' ? null : props.user.location,
      }}
    >
      <DispensariesMapLeaflet />
      <button onClick={() => getGeolocation()}>Locate me!</button>
    </CoordinatesContext.Provider>
  );
};

export default DispensariesMap;
