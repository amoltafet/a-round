import React, { useCallback, useMemo, useRef, Component } from "react";
import { AppRegistry, Dimensions, Pressable } from "react-native";
import MapView, { MapOverlay, Marker, Overlay } from "react-native-maps";
import mockUsers from "../mock/MockData";
import { Avatar, Icon, IconButton } from "react-native-paper";
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
// One can change the mapview's position using refs and component methods, or by passing in an updated region prop. The component methods will allow one to animate to a given position like the native API could.

export default function Map()  {
    const [initialRegion, setInitialRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ["30%", "30%"], []);

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
          zoomEnabled={false}
          minZoomLevel={18}
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
            >
              <Avatar.Image size={32} source={{ uri: marker.avatar }} />
            </Marker>
          ))}

          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="My Location"
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
            onPress={handlePresentModalPress}
          />
          <IconButton
            icon={"search-web"}
            size={22}
            style={{ backgroundColor: "white" }}
            onPress={() => router.push("search")}
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
            top: 330,
            right: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 10,
          }}
        > 
            <IconButton
                icon={"thumb-up"}
                size={22}
                style={{ backgroundColor: "white" }}
                onPress={() => router.push("search")}
            />
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
                style={{ backgroundColor: "white", borderWidth: 0.5, 
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
      >
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
      </BottomSheetModal>
      </BottomSheetModalProvider>

    );
  }

