import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  useColorScheme,
} from "react-native";
import { Header, ListItem, ThemeProvider } from "react-native-elements";
import { BleManager, Subscription, Device, State } from "react-native-ble-plx";
import { View, Text } from "../../components/Themed";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { Avatar, Badge, Button, IconButton, ToggleButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import mockUsers from "../mock/MockData";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SettingsCard from "../../components/SettingsCard";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { auth } from "../../firebase";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

export interface Observer {
  onStarted: (started: boolean) => void;
  onStateChanged: (state: State) => void;
  onDeviceDetected: (device: Device) => void;
  onError: (error: any) => void;
}

function scanner() {
  const bleManager = new BleManager();
  // also acts as 'started' flag
  let subscription: Subscription | null = null;
  // stores external observer callbacks
  let observer: Observer = {
    onStarted: () => {},
    onStateChanged: () => {},
    onDeviceDetected: () => {},
    onError: () => {},
  };

  const observe = (newObserver: Observer) => (observer = newObserver);

  
  const start = () => {
    if (subscription) {
      try {
        subscription.remove();
      } catch (error) {
        observer.onError(error);
      }
    }
    try {
      // listen to ble manager state changes (e.g. PowerOff, PowerOn, ...)
      subscription = bleManager.onStateChange((state) => {
        observer.onStateChanged(state);

        if (state === State.PoweredOn) {
          try {
            // Start scan, will stop previous scans
            bleManager.startDeviceScan(null, {
              "allowDuplicates": false,
          }, (error, device) => {
              if (error) {
                observer.onError(error);
                return;
              }

              if (device) {
                observer.onDeviceDetected(device);
              }
            });
          } catch (error) {
            observer.onError(error);
          }
        }
      }, true);
      observer.onStarted(true);
    } catch (error) {
      observer.onError(error);
      stop();
    }
  };

  const stop = () => {
    if (subscription) {
      try {
        subscription.remove();
        bleManager.stopDeviceScan();
      } catch (error) {
        observer.onError(error);
      }
      subscription = null;
      observer.onStarted(false);
    }
  };

  return {
    start,
    stop,
    observe,
  };
}

declare var global: { HermesInternal: null | {} };

const DEVICE_LIST_LIMIT = 2;

const App = () => {
  const [bleState, setBleState] = useState(State.Unknown);
  const [error, setError] = useState<any>("-");
  const [started, setStarted] = useState<boolean>(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [devideId, setDeviceId] = useState<string>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%", "35%"], []);
  const [modalUser, setModalUser] = useState(null);
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [location, setLocation] = useState(null);
  const { start, stop, observe } = useMemo(() => scanner(), []);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
  const NUM_POINTS = 10;

  interface Point {
    innerX: number;
    innerY: number;
  }

  const handlePresentModalPress = useCallback((user) => {
    setModalUser(user);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
      />
    ),
    []
  );

  useEffect(() => {
    // register observer functions
    observe({
      onStarted: (startedState) => {
        console.log("startedState:", startedState);
        setStarted(startedState);
      },
      onStateChanged: (changedBleState) => {
        console.log("changedBleState", changedBleState);
        setBleState(changedBleState);
      },
      onDeviceDetected: (device: Device) => {
        console.log("device:", device.id, device.name, device.rssi);
        // insert at front, remove last items if list is too long
        // PASS IN USER ID and retrieve user from firestore
        setDevices([device].concat(devices.slice(0, DEVICE_LIST_LIMIT)));

      },
      onError: (err) => {
        console.log("error", err);
        setError(err.toString());
      },
    });
  }, [observe, setStarted, setBleState, setDevices, devices, setError]);

  useEffect(() => setError(""), [started]);

  const toggleStarted = useCallback(() => {
    console.log("toggleStarted");
    const db = getFirestore();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    if (started) {
      stop();
      // update firestore to set user status to inactive
      // and set last seen to current time
      updateDoc(userRef, {
        status: "inactive",
        lastSeen: new Date().toLocaleString(),
      })
      .then(() => {
          console.log('POST - user status and last seen');
      })
      .catch((error) => {
          console.error('Error post user status and last seen', error);
      });
    } else {
      // get users current location and device id
      
      // -- POST to firestore (lat, long) and device id
      updateDoc(userRef, {
          status: "active",
          lastSeen: "now",
          location: {
            lat: 10,
            long: 0,
          },
          device: {
            id: getDeviceId(),
          },
      })
      .then(() => {
          console.log('POST - user loc and device id');
      })
      .catch((error) => {
          console.error('Error setting user loc and device id: ', error);
      });


      start();
    }
  }, [started, start, stop]);

  function createPoints(): Point[] {
    const points = [];

    const angleStep = (Math.PI * 2) / NUM_POINTS;
    const innerRad = 120;
    const horizontalMargin = screenWidth / 9;
    const verticalMargin = screenHeight / 3;
    const middleX = screenWidth / 2 - horizontalMargin;
    const middleY = screenHeight / 2 - verticalMargin;

    for (let i = 1; i <= NUM_POINTS; i++) {
      const theta = i * angleStep;

      const x = middleX + Math.cos(theta) * innerRad;
      const y = middleY + Math.sin(theta) * innerRad;

      points.push({
        innerX: x,
        innerY: y,
      });
    }

    return points;
  }

  // get users current location
  // -- POST to firestore (lat, long) and device id
  // -- SCAN for users within 30 meters
  // -- CHECK if user is in app (STATUS IS ACTIVE) && device id is in firestore
  // -- IF true, show the user in the circle


  return (
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.statusPanel}>
        <View>
        <Text style={{ fontSize: 22, fontWeight: "500" }}>People Nerby</Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>Within 5 meters from you</Text>
        </View>
        <Button mode="contained" onPress={() => router.push("map")} 
        icon={({ size, color }) => (
          <Ionicons name="map-outline" size={size} color={color} />
        )}
        >
          Map Mode
        </Button>
      </View>
      <SettingsCard
        title="Distance & Preferences"
        subTitle="Manage your distance and preferences"
        icon="location-outline"
        link="editProfile"
      />

      <View style={{ justifyContent: "center", alignItems: "center"}}>
          <AnimatedRing />
        
        <View
          style={{
            width: "100%",
            height: 350,
          }}
        > 
          <IconButton
            style={{ position: "absolute", top: 10, right: 10 }}
            icon="refresh-circle"
            size={20}
            onPress={ () => {
              setDevices([]);
            }}
            />

          {createPoints().map((point, idx) => {
            return (
              <Pressable onPress={ e => handlePresentModalPress(mockUsers[idx])} key={idx}>
              <View
              
                style={{
                  position: "absolute",
                  top: point.innerY,
                  left: point.innerX,
                  borderWidth: 2,
                  borderRadius: 40,
                  borderColor: "white",
                  elevation: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.8,
                }}
              >
                <Avatar.Image
                  size={64}
                  source={{ uri: mockUsers[idx].avatar }}
                />
                <Badge
                  size={20}
                  style={{ 
                    position: "absolute", 
                  backgroundColor: "white",
                  color: "black",
                  borderWidth: 0.5,
                  borderColor: "grey",
                  top: 0, 
                }}
                >3</Badge>
              </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: "500" }}>BLE Scanner</Text>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            {bleState}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>{error}</Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="contained" 
              onPress={toggleStarted}
              icon={({ size, color }) => (
                <Ionicons name="bluetooth-outline" size={size} color={color} />
              )}
            >
              {started ? "Stop" : "Start"}
            </Button>
            
          </View>
          <ListOfUsers users={devices} />
        </View>

      

    
      <SettingsCard title="Visible" subTitle="To see more people, switch to map mode or increase your distance."  
         toggle border icon="eye-outline" 
        
      />
    </SafeAreaView>
    <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}       
      >
        <UserModal user={modalUser} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const UserModal = ({ user }) => {
  console.log(user);
  return (
    <View style={{ padding: 10 }} key={user.id}>
      <Text style={{ fontSize: 22, fontWeight: "500" }}>Distance</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image size={64} source={{ uri: user.avatar }} />
        <Text style={{ fontSize: 32, fontWeight: "400" }}>{user.id}</Text>
      </View>
      <Text style={{ fontSize: 32, fontWeight: "400" }}>3 meters</Text>

    </View>
  );
}


const ListOfUsers = ({users}) => {
  return (
    <View style={{ padding: 5 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          
        }}
      >
        Others Near You
      </Text>
      <Text style={{ fontSize: 12, fontWeight: "400", marginBottom: 5 }}>Within 10 meters from you</Text>


      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {users.map((user, index) => (
          <View style={{ marginRight: 20,  alignItems: "center" }} key={index}>
            <Avatar.Image key={index} size={64} source={{ uri: user.avatar }} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                paddingTop: 5,
                fontWeight: "600",
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                paddingTop: 3,
                fontWeight: "600",
                color: "grey",
              }}
            >
              {user.lastSeen ? user.lastSeen : "now"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Ring = ({ delay }) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false
      )
    );
  }, []);
 
  return <Animated.View style={[styles.circle, ringStyle]} />;
};

function AnimatedRing() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "transparent",
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 40,
        borderColor: "tomato",
        borderWidth: 2,
        zIndex: 1,
      }}
    >
  <View
           style={{ backgroundColor: "tomato", padding: 5, borderRadius: 50, 
              zIndex: 1000,
            }}
            >
             
              <Avatar.Image size={24} source={{ uri: mockUsers[0].avatar }} />
            </View>
      <Ring delay={0} />
      <Ring delay={1000} />
      <Ring delay={2000} />
      <Ring delay={3000} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  statusPanel: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 40,
    borderColor: "tomato",
    borderWidth: 10,
    zIndex: 1,
  },
});

export default App;
