import {
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { Chip, Avatar, Button, Card, IconButton, Icon } from "react-native-paper";
import SettingsCard from "../../components/SettingsCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
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
      <SettingsCard 
        title="Private Profile" 
        subTitle="Only your connections can see your profile"
        icon="md-lock-closed-outline"  
        toggle 
        link="/settings/privacy"      
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
        <Text style={styles.title}>{User.name}</Text>
        <Text style={styles.subTitle}>@{User.username}</Text>
        <View style={styles.separator} />
        <Text style={styles.subTitle}>
          {User.location} · {User.connections} Connections
        </Text>
      </View>
      <IconButton
        icon="pencil"
        size={20}
        style={{ marginLeft: "auto", borderWidth: 1, borderColor: "grey" }}
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
      }}
    >
      <Chip
        mode="outlined"
        onPress={() => console.log("Pressed")}
        style={{
          marginRight: 5,
        }}
      >
        <Text style={{ color: "black", backgroundColor: Colors.secondary.main }}>{User.connections} Pokes</Text>
      </Chip>
      <Chip
        mode="outlined"
        icon=""
        onPress={() => console.log("Pressed")}
        style={{ marginLeft: 5, borderColor: Colors.primary.main }}
      >
        <Ionicons name="eye-outline" size={18} color={Colors.primary.main} />
        <View style={{ width: 5 }} />
        <Text style={{ color: Colors.primary.main }}>Profile Views</Text>
      </Chip>
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
