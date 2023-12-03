import React, { useCallback, useMemo, useRef, Component, useEffect } from "react";
import {
  AppRegistry,
  Dimensions,
  Pressable,
  useColorScheme,
  StyleSheet,
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
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useCountdown } from 'react-native-countdown-circle-timer'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
export default function Map() {
  const [initialRegion, setInitialRegion] = React.useState({
    latitude: 47.6602333,
    longitude: -117.4081112,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })

  const [topModelVisible, setTopModelVisible] = React.useState(Boolean);

  const [screenName, setScreenName] = React.useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["35%", "35%"], []);

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
  const screen = Dimensions.get("screen");

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
              <CountdownCircleTimer
              isPlaying
              duration={duration}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              size={40}
              strokeWidth={3}
            >
              {({ remainingTime }) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
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
          ref={(mapView) => {
            _mapView = mapView;
          }}
          scrollEnabled={true}
          zoomEnabled={true}
          minZoomLevel={16}
          maxZoomLevel={20}
          
          style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
          initialRegion={initialRegion}
        >
          {
            mockUsers.slice(1, 11).map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: 47.6602333 + Math.random() * (0.001 - -0.001) + -0.001,
                longitude: -117.4081112 - Math.random() * 0.001,
              }}
              onPress={() => setScreenModal("user")}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 50,
                }}
              >
                <Avatar.Image size={32} source={{ uri: marker.avatar }} />
              </View>
            </Marker>
          ))}

          <Marker
            coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
            title="Come take talk to me about business!"
          >
            <AnimatedRing />
           
          </Marker>
          <Circle center={initialRegion} radius={120} fillColor="rgba(0, 0, 0, 0.1)" />
        </MapView>
        <View
          style={{
            position: "absolute",
            top: "10%",
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
            icon={"search-web"}
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
       
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            marginTop: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 10,
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
           <IconButton icon={"arrow-left"} size={22} 
            onPress={() => router.push("/(tabs)")}
            style={{ backgroundColor: "white" }}
          />

            <View style={{ backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
                Location
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  marginTop: 5,
                  paddingRight: 10,
                }}
              >
                <Ionicons name="location" size={20} color="white" />
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "white" }}
                >
                  {" "}
                  Catalyst Building, Spokane
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 380,
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
            bottom: 50,
            right: screen.width / 2 - 30,
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
              _mapView.animateToRegion(
                {
                  latitude: initialRegion.latitude,
                  longitude: initialRegion.longitude,
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
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        People Near You
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Chip
          style={{ marginRight: 10 }}
          mode="outlined"
          onPress={() => filterByConnection()}
        >
          Connected
        </Chip>
        <Chip
          style={{ marginRight: 10 }}
          mode="outlined"
          onPress={() => filterByRestrict()}
        >
          Restricted
        </Chip>
        <Chip
          style={{ marginRight: 10 }}
          mode="outlined"
          onPress={() => filterByPoke()}
        >
          Poked
        </Chip>
        
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {users.map((user, index) => (
          <View style={{ marginRight: 20 }} key={user.id}>
            <Avatar.Image key={index} size={64} source={{ uri: user.avatar }} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                paddingTop: 5,
                fontWeight: "600",
              }}
            >
              {user.username}
            </Text>
            <Text style={{
              textAlign: "center",
              fontSize: 12,
              paddingTop: 3,
              fontWeight: "600",
              color: 'grey'
            }}>{
              user.lastSeen ? user.lastSeen : 'now'
            }</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const AnimatedRing = () => {
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
        }}
      >
         <View
              style={{ backgroundColor: "green", padding: 5, borderRadius: 50, 
              zIndex: 1000,
            }}
            >
             
              <Avatar.Image size={35} source={{ uri: mockUsers[0].avatar }} />
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
  
  return <AnimatedRing />;
}
