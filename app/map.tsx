import React, { useCallback, useMemo, useRef, Component, useEffect, useState } from "react";
import {
  AppRegistry,
  Dimensions,
  Pressable,
  useColorScheme,
  StyleSheet,
  Platform,
  Animated as RNAnimated,
} from "react-native";
import MapView, { Circle, MapOverlay, Marker, Overlay } from "react-native-maps";
import mockUsers from "./mock/MockData";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Icon,
  IconButton,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import { Text, View } from "../components/Themed";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import SettingsCard from "../components/SettingsCard";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { auth } from "../firebase";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { transform } from "@babel/core";
// https://javascript.plainenglish.io/add-a-map-to-your-app-and-make-it-look-sick-react-native-2398c75be86b

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 30;

export default function Map() {
  const screen = Dimensions.get("screen");
  const [loading, setLoading] = React.useState(true);
  const [location, setLocation]= useState({
    coordinates: {
      latitude: 37.6602333,
      longitude: -117.4081112,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    city: "",
    postalCode: "",
    region: "",
    district: "",
  });
  const [topModelVisible, setTopModelVisible] = React.useState(Boolean);
  const [screenName, setScreenName] = React.useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%", "35%"], []);
  const _mapView = React.useRef(null);
  const _scrollView = React.useRef();
  let mapIndex = 0;
  let mapAnimation = new RNAnimated.Value(0);

  useEffect(() => {
    (async () => {
      // get location from firebase
      const db = getFirestore();
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLocation({
          coordinates: {
            latitude: docSnap.data().location.latitude,
            longitude: docSnap.data().location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          },
          city: docSnap.data().location.city,
          postalCode: docSnap.data().location.postalCode,
          region: docSnap.data().location.region,
          district: docSnap.data().location.district,
        });
        console.log("location", location);
      } else {
        console.log("No such document!");
      }
    })();  
    _mapView.current.animateToRegion(
      {
        coordinate: {
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
        },
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      350
    );
    
    setLoading(false);
  } , []);

  const mapStyle = {
    transform: [
      {
        rotateY: "180deg"}
      
    ],
  }

  

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); 
      if (index >= mockUsers.length) {
        index = mockUsers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = mockUsers[index];
          _mapView.current.animateToRegion(
            {
              coordinate: {
                latitude: 47.6602333,
                longitude: -117.4081112,
              },
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            },
            350
          );
          _mapView.current.animateToViewingAngle(45, 350);
        }
      }, 10);
      
      clearTimeout(regionTimeout);
    });
  });

  const interpolations = mockUsers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 2, 1],
      extrapolate: "clamp"
    });

    return {scale};
  }); 
  
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }
  
  const setScreenModal = (screenName: any) => {
    console.log("setScreenModal", screenName);
    setScreenName(screenName);
    handlePresentModalPress();
  };
  // callbacks
  const handlePresentModalPress = useCallback(() => {
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

  const UserModal = () => {
    const user = mockUsers[2];
    const [waveText, setWaveText] = React.useState("Wave 👋");
    const wave = () => {
      console.log("wave");
      setWaveText("Waved 👋");
      // wait 2 seconds
      
    };

    const resetWave = () => {
      setWaveText("Wave 👋");
    };

    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image size={64} source={{ uri: user.avatar }} />
          <View style={{ marginTop: 10, flexGrow: 1 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", marginLeft: 10 }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400", marginLeft: 10 }}>
              @{user.username}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 10 }}>
          Common Interests{" "}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {user.moreInformation.interests.map((interest, index) => (
            <Chip key={index} style={{ marginRight: 10 }} mode="outlined">
              {interest}
            </Chip>
          ))}
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button
            mode="contained"
            style={{
              marginTop: 10,
              marginRight: 10,
              backgroundColor: "#DB7f8e",
              borderRadius: 10,
            }}
            onPress={() => console.log("Pressed")}
          >
            <Text style={{ color: "white" }}>Dismiss</Text>
          </Button>
          <Button
            mode="contained"
            style={{
              marginTop: 10,
              backgroundColor: "green",
              flex: 1,
              borderRadius: 10,
            }}
            onPress={() => wave()}
          >
            <Text style={{ color: "white" }}>{waveText}</Text>
          </Button>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "300",
            marginTop: 10, // underline
            textDecorationLine: "underline",
          }}
        >
          Restrict or Block {user.name}{" "}
        </Text>
        <IconButton
          icon="close"
          size={20}
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={() => bottomSheetModalRef.current?.dismiss()}
        />
      </View>
    );
  };

  const TopModal = () => {
    const user = mockUsers[0];
    const [waveText, setWaveText] = React.useState("Wave 👋");
    const [duration, setDuration] = React.useState(120);

    const wave = () => {
      setWaveText("You connected!");
    
    }
    return (
      <View >
        <Modal
          isVisible={topModelVisible}
          onBackdropPress={() => setTopModelVisible(false)}
          style={{ margin: 0, justifyContent: "flex-start", paddingTop: 50 }}
        >
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image size={38} source={{ uri: user.avatar }} />
              <View style={{ marginTop: 8, flexGrow: 1 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", marginLeft: 10 }}>
                  {user.name} waved at you!
                </Text>
              </View>
              
            </View>
            <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 10 }}>
            ❗ You have 2 minutes to wave back
            </Text>

            <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 10 }}
          >
          Common Interests{" "}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {user.moreInformation.interests.map((interest, index) => (
            <Chip key={index} style={{ marginRight: 10 }} mode="outlined"
              
            >
              {interest}
            </Chip>
          ))}
        </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
                mode="contained"
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  backgroundColor: "#DB7f8e",
                  borderRadius: 10,
                }}
                onPress={() => setTopModelVisible(false)}
              >
                <Text style={{ color: "white" }}>Dismiss</Text>
              </Button>
              <Button
                mode="contained"
                style={{
                  marginTop: 10,
                  backgroundColor: "green",
                  flex: 1,
                  borderRadius: 10,
                }}
                onPress={() => wave()}
              >
                <Text style={{ color: "white" }}>{waveText}</Text>
              </Button>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                marginTop: 10, // underline
                textDecorationLine: "underline",
              }}
            >
              Restrict or Block {user.name}{" "}
            </Text>
           
          </View>
        </Modal>
      </View>
    );
  };  

   return (
    <BottomSheetModalProvider>
      <View style={{ position: "relative", height: "100%" }}>
        <MapView
          ref={_mapView}
          scrollEnabled={true}
          zoomEnabled={true}
          minZoomLevel={16}
          maxZoomLevel={20}
          loadingEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
          initialRegion={location.coordinates}
          region={location.coordinates}
          // make 3d
          pitchEnabled={true}
          showsBuildings={true}
         
        > 
          {
            
            mockUsers.slice(1, 11).map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return (
            <Marker
              key={index}
              coordinate={{
                latitude: location.coordinates.latitude + Math.random() * (0.001 - -0.001) + -0.001,
                longitude: location.coordinates.longitude - Math.random() * 0.001,
              }}
              onPress={(e)=>onMarkerPress(e)}
            >
              <RNAnimated.View
                style={
                  {
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "white",
                    borderWidth: 1,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }
                }
              >
                <RNAnimated.Image source={{ uri: marker.avatar }} 
                style={[ 
                  scaleStyle,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    borderColor: "white",
                    borderWidth: 1,
                  } 
                  
                ]}
                resizeMode="cover"
                />
              </RNAnimated.View>
            </Marker>
          )}
          )}

         
        </MapView>
        <View
          style={{
            position: "absolute",
            top: "8%",
            right: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 10,
          }}
        >
          <IconButton
            icon={"eye"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => setScreenModal("visibility")}
          />
          <IconButton
            icon={"magnify"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => router.push("search")}
          />
          <IconButton
            icon={"format-list-bulleted"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => setScreenModal("list")}
          />
          <IconButton
            icon={"baseball"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => router.push("search")}
          />
          <IconButton
            icon={"clock"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => router.push("search")}
          />
          
        </View>
        <IconButton
            icon={""}
            size={22}
            style={{ 
            position: "absolute",
            top: 200,
            left:0,
            backgroundColor: "transparent"
            
          }}
            onPress={() => 
              setTimeout(() => {
                setTopModelVisible(true);
              }, 2000)}
          /> 

    <RNAnimated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={{ 
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          paddingVertical: 10,
        }}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          justifyContent: "center", 
          alignItems: "center", 
          alignContent: "center"
        }}
        onScroll={RNAnimated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {mockUsers.slice(1, 11).map((user, index) =>(
           <View style={{ marginRight: 10,  alignItems: "center", backgroundColor: "white",
           borderWidth: 1, borderRadius: 10, borderColor: "lightgrey", padding: 7, flex: 1, justifyContent: "space-between", marginTop: 8
           }} key={index}>
             <Avatar.Image key={index} size={48} source={{ uri: user.avatar }} />
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
                 fontSize: 10,
                 paddingTop: 5,
                 fontWeight: "600",
               }}
             >
               @{user.username}
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

        </RNAnimated.ScrollView>

        <IconButton
          icon={"arrow-left"}
          size={22}
          iconColor="white"
          style={{ 
            position: "absolute",
            top: 60,
            left: 20,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
          
          onPress={() => router.back()}
        />
       
        <View
          style={{
            position: "absolute",
            top: 50,
            left: "50%",
            transform: [{ translateX: -90 }],
            marginTop: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 20,
          }}
        > 
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              backgroundColor: "transparent",
            }}
          >
                <Ionicons name="location" size={16} color="white" />
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "white" }}
                >
                  {" "}
                  {location.district}, {location.city} 
                </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 340,
            right: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 10,
          }}
        >
          <IconButton
            icon={"thumb-up"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => router.push("connections")}
          />
          <Badge style={{ position: "absolute", top: 0, right: 0 }}>9</Badge>
        </View>
    

        <View
          style={{
            position: "absolute",
            bottom: 160,
            right: screen.width / 2 - 22,
            borderRadius: 50,
          }}
        >
          <IconButton
            icon={"navigation"}
            size={22}
            iconColor={
              useColorScheme() === "dark" ? Colors.dark.tint : Colors.light.tint
            }
            style={{
              transform: [{ rotate: "35deg" }],
            }}
            onPress={() =>
              _mapView.current.animateToRegion(
                {
                  latitude: location.coordinates.latitude,
                  longitude: location.coordinates.longitude,
                },
                1000
              )
            }
          />
        </View>
      </View>
      
      <TopModal />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "transparent" }}
        style={{
          backgroundColor:
            useColorScheme() === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        }}
      >
        {screenName === "visibility" && <VisibilitySettings />}
        {screenName === "user" && <UserModal />}
        {screenName === "list" && <ListOfUsers />}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const VisibilitySettings = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Visibility Settings
      </Text>
      <SettingsCard
        title="Visibility"
        subTitle="Turn on visibility to see people around you"
        icon="eye-outline"
        toggle
      />
      <SettingsCard
        title="More Settings"
        icon="settings-outline"
        subTitle="Manage all your settings and privacy"
        link="settings"
        border
      />
    </View>
  );
};

const ListOfUsers = () => {
  const [users, setUsers] = React.useState(mockUsers);
  const [currentUser, setCurrentUser] = React.useState(mockUsers[0]);

  const filterByConnection = () => {
    clearFilter();
    setUsers(users.filter((user) => currentUser.connections.includes(user.id)));
  };

  const filterByPoke = () => {
    clearFilter();
    setUsers(users.filter((user) => currentUser.pokes.includes(user.id)));
  };

  const filterByRestrict = () => {
    clearFilter();
    setUsers(users.filter((user) => currentUser.blocked.includes(user.id)));
  };

  const clearFilter = () => {
    setUsers(mockUsers);
  };

  return (
    <View style={{ padding: 10,  backgroundColor: "transparent" }}>
    <Text
      style={{
        fontSize: 22,
        fontWeight: "500",
      
      }}
    >
      Users Near You
    </Text>
    <Text style={{ fontSize: 12, fontWeight: "400", marginBottom: 10 }}>Within 10 meters from you</Text>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {users.map((user, index) => (
        <View style={{ marginRight: 10,  alignItems: "center", backgroundColor: "white",
        borderWidth: 1, borderRadius: 10, borderColor: "lightgrey", padding: 5, flex: 1, justifyContent: "space-between", marginTop: 8
        }} key={index}>
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
              fontSize: 10,
              paddingTop: 5,
              fontWeight: "600",
            }}
          >
            @{user.username}
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

