import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { auth } from '../firebase';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import SettingsCard from '../components/SettingsCard';
import { getDatabase, ref } from 'firebase/database';

import {GeoFire} from 'geofire';
const LOCATION_TRACKING = 'location-tracking';

var l1;
var l2;
var regionName;

function UserLocation() {
    const [locationStarted, setLocationStarted] = React.useState(false);
    const db = getFirestore();
    const userRef = doc(db, "users", auth.currentUser.uid);
    const startLocationTracking = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 5000,
            distanceInterval: 0,
        });
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TRACKING
        );
        setLocationStarted(hasStarted);
        console.log('tracking started?', hasStarted);
    };

    React.useEffect(() => {
        const config = async () => {
            let resf = await Location.requestForegroundPermissionsAsync();
            let resb = await Location.requestBackgroundPermissionsAsync();
            if (resf.status != 'granted' && resb.status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                console.log('Permission to access location granted');
            }
        };

        config();
    }, []);

    const startLocation = () => {
        startLocationTracking();
    }

    const stopLocation = () => {
        setLocationStarted(false);
        TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
            .then((tracking) => {
                if (tracking) {
                    Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
                    updateDoc(userRef, {
                        lastSeen: new Date(Date.now()).toLocaleString(),
                        status: 'offline',
                    });
                }
            })
            .catch((err) => {
                console.log('stopLocation error:', err);
            });
        
    }

    const toggleLocation = () => {
        if (locationStarted) {
            stopLocation();
        } else {
            startLocation();
        }
    }

    return (
        <SettingsCard title="Location" subTitle='Manage your location settings' icon="location-outline" toggle
            onToggle={toggleLocation} value={locationStarted}
        />
    );
}


TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) {
       
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;

        l1 = lat;
        l2 = long;
        regionName = await Location.reverseGeocodeAsync (
                    {
                    latitude: l1,
                    longitude: l2,
        });
        console.log('LOCATION_TRACKING task:', regionName);

        console.log(
            `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
        );
    }
    const db = getFirestore();
    const userRef = doc(db, "users", auth.currentUser.uid);
    const firebaseRef = ref(getDatabase(), 'geofire');
    const geoFireInstance = new GeoFire(firebaseRef);
    geoFireInstance.set(auth.currentUser.uid, [l1, l2])
    
    await updateDoc(userRef, {
        location: {
            latitude: l1,
            longitude: l2,
            city : regionName[0].city,
            postalCode : regionName[0].postalCode,
            region : regionName[0].region,
            district : regionName[0].district,
        },
        lastSeen: new Date(Date.now()).toLocaleString(),
        status: 'online',
    });

});

export default UserLocation;