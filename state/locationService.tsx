import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const getLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);
  if (errorMsg) {
    let location = {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
    setLocation(location);
  } 
  return location;
};


export default { getLocation};
