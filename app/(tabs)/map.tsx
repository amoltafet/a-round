import React, { useCallback, useMemo, useRef, Component } from "react";
import { AppRegistry, Dimensions, Pressable, useColorScheme } from "react-native";
import MapView, { MapOverlay, Marker, Overlay } from "react-native-maps";
import mockUsers from "../mock/MockData";
import { Avatar, Badge, Button, Chip, Icon, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { Text, View } from "../../components/Themed";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
  } from "@gorhom/bottom-sheet";
import SettingsCard from "../../components/SettingsCard";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-elements/dist/helpers";

export default function Map()  {
    const [initialRegion, setInitialRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    const [screenName, setScreenName] = React.useState("");
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ["35%", "35%"], []);

    const setScreenModal = (screenName: any) => {
      console.log("setScreenModal", screenName);
        setScreenName(screenName);
        handlePresentModalPress();
    }
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
   
    return (
    <BottomSheetModalProvider>
      <View style={{ position: "relative", height: "100%" }}>
        <MapView
          ref = {(mapView) => { _mapView = mapView; }}
          scrollEnabled={true}
          zoomEnabled={true}
          minZoomLevel={18}
          maxZoomLevel={20}
          style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
          initialRegion={initialRegion}
        >
          {mockUsers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: 37.78825 + Math.random() * (0.001 - -0.001) + -0.001,
                longitude: -122.4324 - Math.random() * 0.001,
              }}
              onPress={() => setScreenModal("user")}
            > 
            <View style={{ backgroundColor: "white", padding: 5, borderRadius: 50 }}>
               <Avatar.Image size={32} source={{ uri: marker.avatar }} /> 
            </View>
            </Marker>
          ))}

          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="Come take shots with me!"
          >
            <View
              style={{ backgroundColor: "green", padding: 5, borderRadius: 50 }}
            >
              <Avatar.Image size={35} source={{ uri: mockUsers[0].avatar }} />
            </View>
          </Marker>
        </MapView>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            marginTop: 125,
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
        <View
          style={{
            position: "absolute",
            top: 50,
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
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
                Location
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Ionicons name="location" size={20} color="white" />
                <Text
                  style={{ fontSize: 19, fontWeight: "500", color: "white" }}
                >
                  {" "}
                  EastSide Bar, Seattle
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
                iconColor={useColorScheme() === "dark" ? Colors.dark.tint : Colors.light.tint}
                style={{ 
                transform: [{ rotate: "35deg" }]
              }}
                onPress = {() => _mapView.animateToRegion({
                  latitude: 37.78825,
                  longitude: -122.4324
                }, 1000)}
            />
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "transparent" }}
        style={{ backgroundColor: useColorScheme() === "dark" ? Colors.dark.background : Colors.light.background }}
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
          <Text style={{
            fontSize: 22,
            fontWeight: "500",
            marginBottom: 10,
            marginTop: 10,
          }}>Visibility Settings</Text>
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
  )
}

const UserModal = () => {
  const user = mockUsers[0];
  return (
    <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flexDirection: "row"}}>
            <Avatar.Image size={64} source={{ uri: user.avatar }} />
            <View style={{  marginTop: 10, flexGrow: 1 }}>
              <Text style={{ fontSize: 22, fontWeight: "500", marginLeft: 10 }}>{user.name}</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", marginLeft: 10 }}>@{user.username}</Text>
            </View>
          </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Ionicons name="beer-outline" size={23} color="grey" />
        <Text style={{ fontSize: 14, fontWeight: "500", marginLeft: 10, marginTop: 3 }}>Who wants to get drinks and chat? </Text>
        </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button
            mode="contained"
            style={{ marginTop: 10, marginRight: 10, backgroundColor: Colors.light.tint }}
            onPress={() => console.log("Pressed")}> 
            <Text style={{ color: "white" }}>Restrict</Text>
          </Button>
          <Button
            mode="contained"
            style={{ marginTop: 10, backgroundColor: Colors.light.tint, flex: 1 }}
            onPress={() => console.log("Pressed")}> 
            <Text style={{ color: "white" }}>Connect</Text>
          </Button>

          </View>
          <Text style={{ fontSize: 14, fontWeight: "300", marginTop: 10 }}>To connect with {user.name}, you must first connect with them. </Text>
          <IconButton icon="close" size={20} style={{ position: "absolute", top: 10, right: 10 }} onPress={() => console.log("Pressed")} />
        </View>
  )
}

const ListOfUsers = () => {
  const [users, setUsers] = React.useState(mockUsers)
  const [currentUser, setCurrentUser] = React.useState(mockUsers[0])
  
  const filterByConnection = () => {
    clearFilter()
    setUsers(users.filter((user) => currentUser.connections.includes(user.id)))
  }

  const filterByPoke = () => {
    clearFilter()
    setUsers(users.filter((user) => currentUser.pokes.includes(user.id)))
  }

  const filterByRestrict = () => {
    clearFilter()
    setUsers(users.filter((user) => currentUser.blocked.includes(user.id)))
  }

  const clearFilter = () => {
    setUsers(mockUsers)
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: "500",
            marginBottom: 10,
          }}>People Near You</Text>
          <View  style={{ flexDirection: "row", marginBottom: 10 }}>
          <Chip   
          style={{ marginRight: 10 }} mode="outlined" onPress={ () => filterByConnection()}>
            Connected
          </Chip>
          <Chip  style={{ marginRight: 10 }} mode="outlined" onPress={() => filterByRestrict()}>
            Restricted
          </Chip>
          <Chip  style={{ marginRight: 10 }} mode="outlined" onPress={() => filterByPoke()}>
            Poked
          </Chip>
          <Chip  style={{ marginRight: 10 }} mode="outlined" onPress={() => clearFilter()} icon={"close"}>
            Clear
          </Chip>
          </View> 
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {users.map((user, index) => (
            <View style={{ marginRight: 20 }} key={user.id}>
            <Avatar.Image key={index} size={64} source={{ uri: user.avatar }} />
            <Text style={{ textAlign: "center",
              fontSize: 12, paddingTop: 5, fontWeight: "600"
          }}>{user.username}</Text>
            </View>
          ))  
          }
          </ScrollView>
      </View>
  )
}
