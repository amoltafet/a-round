import {
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { Avatar, Card, IconButton, Icon, Button } from "react-native-paper";
import { Chip } from "react-native-elements";
import SettingsCard from "../../components/SettingsCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Colors from "../../constants/Colors";
import { TabView, SceneMap } from "react-native-tab-view";
import React from "react";

import mockUsers from "../mock/MockData";
import ProfileTabs from "../../components/ProfileTabs";
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Profile />

      <Connections />

      <Chip
        type="outline"
        title="Hey, lets be real, pineapples don't belong on pizza!"
        icon={
        <Ionicons name="chatbox-ellipses-outline" size={22} 
          color={"black"}
        />}
        titleStyle={{ color: "black" }}
        buttonStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          justifyContent: "flex-start",
          gap: 5,
          
        }} 
      />
      <Text style={{ fontSize: 12, fontWeight: "400", color: "grey", 
      marginLeft: 38, marginTop: -10, marginBottom: 15
    }}>
        Click to start a conversation
      </Text>
      
      <View style={{ flexDirection: "row", gap: 5, marginBottom: 5 }}>
        <Chip
          icon={<Ionicons name="logo-instagram" size={18} color="darkblue"/>}
          type="outline"
          title="Instagram"
          titleStyle={{ color: "darkblue" }}
          buttonStyle={{
            borderColor: "darkblue",
            borderRadius: 10,   
            gap: 5,   
          }}
        />
        <Chip
           icon={<Ionicons name="logo-linkedin" size={18} color="darkblue"/>}
           type="outline"
           title="LinkedIn"
           titleStyle={{ color: "darkblue" }}
           buttonStyle={{
            borderColor: "darkblue",
            borderRadius: 10,  
            gap: 5,    
          }}
         />
        <Chip
          icon={<Ionicons name="logo-facebook" size={18} color="darkblue"/>}
          type="outline"
          title="Facebook"
          titleStyle={{ color: "darkblue" }}
          buttonStyle={{
            borderColor: "darkblue",
            borderRadius: 10,   
            gap: 5,   
          }}
        />
      </View>
      <SettingsCard
        title="Private Profile"
        subTitle="Only your connections can see your profile"
        icon="md-lock-closed-outline"
        toggle
        border
      />
      <ProfileTabs />
    </View>
  );
}

const User = mockUsers[0];

function Profile() {
  return (
    <View style={styles.profileContainer}>
      <View
        style={{
          borderWidth: 4,
          borderColor: Colors.secondary.main,
          shadowColor: "black",
          shadowOpacity: 0.5,
          backgroundColor: "lightgrey",
          borderRadius: 50,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }}
      >
        <Avatar.Image size={86} source={{ uri: User.avatar }} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{User.name}</Text>
          <IconButton
            icon="check"
            size={10}
            style={{
              borderWidth: 1,
              borderColor: "grey",
              borderStyle: "dashed",
            }}
            onPress={() => console.log("Pressed")}
          />
        </View>

        <Text style={styles.subTitle}>@{User.username}</Text>
        <View style={styles.separator} />
        <Text style={styles.subTitle}>
          Seattle · last location 2 hours ago
        </Text>
      </View>
      <IconButton
        icon="pencil"
        size={12}
        style={{
          marginLeft: "auto",
          borderWidth: 1,
          borderColor: "grey",
          backgroundColor: "lightgrey",
        }}
        onPress={() => console.log("Pressed")}
        
      />
    </View>
  );
}

function Connections() {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 10,
      }}
    >
     <Link
        href={{ pathname: "/connections", params: { tab: "connections" } }}
        asChild
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.primary.dark, fontSize: 18, fontWeight: "bold" }}>{User.connections}</Text>
        <Text style={{ color: Colors.primary.dark }}>Connections</Text></Pressable>
      </Link>
      <View style={{ width: 30 }} />

      <Link
        href={{ pathname: "/connections", params: { tab: "requests" } }}
        asChild
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.primary.dark, fontSize: 18, fontWeight: "bold" }}>2</Text>
        <Text style={{ color: Colors.primary.dark }}>Requests</Text></Pressable>
      </Link>

      <View style={{ width: 30 }} />

      <Link
        href={{ pathname: "/connections", params: { tab: "pokes" } }}
        asChild
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.primary.dark, fontSize: 18, fontWeight: "bold" }}>21</Text>
        <Text style={{ color: Colors.primary.dark }}>Pokes</Text></Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.secondary.main,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
    marginTop: 5,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "300",
    color: "black",
  },

  separator: {
    marginVertical: 5,
    width: "100%",
  },
  profileContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
});
