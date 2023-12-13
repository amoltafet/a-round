import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { Avatar, Badge } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Map from "../map";
import Profile from "./profile";
import Notifs from "./notifs";
import Settings from "./settings";
import Nerby from ".";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import Messages from "./messages";
import { auth } from "../../firebase";

SplashScreen.preventAutoHideAsync();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={24} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "black",

        tabBarIndicator: () => null,
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "#e6e6e6",
          elevation: 1,
          shadowColor: "grey",
          shadowOpacity: 0.1,
          shadowRadius: 15,
          paddingVertical: 5,
          shadowOffset: { width: 0, height: 0 }
        },
       
      }}
    >
  
  <Tab.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account"color={color}
            />
          ),
        }}
        component={Profile}
      />
         <Tab.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
           <>
            <TabBarIcon name="chat-processing" color={color} />
            <Badge
              size={12}
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "tomato",
              }}
            > </Badge>
            </>
          ),
        }}
        component={Messages}
      />

      
         <Tab.Screen
        name="index"
        options={{
          title: "Nerby",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-marker-account" color={color} />
          ),
        }}
        component={Nerby}
      />
 


      <Tab.Screen
        name="notifs"
        options={{
          title: "Notifications",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bell-outline" color={color} />
          ),
        }}
        component={Notifs}
      />

    

      <Tab.Screen
        name="settings"
        options={{
          title: "Settings & Privacy",
          tabBarLabel: "",
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}
