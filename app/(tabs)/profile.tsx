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
import { Chip, Image } from "react-native-elements";
import SettingsCard from "../../components/SettingsCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Colors from "../../constants/Colors";
import { TabView, SceneMap } from "react-native-tab-view";
import React from "react";
import { useColorScheme } from "react-native";
import mockUsers from "../mock/MockData";
import ProfileTabs from "../../components/ProfileTabs";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-elements/dist/helpers";
export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create(
    {
    container: {
      paddingTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "transparent",
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      color: "white",
      marginTop: 5,
    },
    subTitle: {
      fontSize: 22,
      fontWeight: "600",
      color: "white",
    },
  
    separator: {
      marginVertical: 5,
      width: "100%",
    },
    profileContainer: {
      flexDirection: "row",
      paddingBottom: 20,
      backgroundColor: "transparent",
      marginTop: 200,
    },
  });
  return (
    <ScrollView showsHorizontalScrollIndicator={false} 
    showsVerticalScrollIndicator={false} 
    alwaysBounceHorizontal={false}
    bounces={false}
      style={{ paddingBottom: 80, backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background
      }}
    >
      <Image source={{ uri: "https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg" }} style={{ width: "100%", height: 350, overflow: "hidden", 
       backgroundColor: "rgba(0,0,0,0.3)",
    }} >
          <Profile />
      </Image>
      
      <Connections />

      <View style={styles.container} >
      
      <View style={{ flexDirection: "row", gap: 5, marginBottom: 5, flexWrap: "wrap"}}>
        <Pressable style={{ 
          borderWidth: 0.5,
          borderColor: "grey", 
          borderRadius: 10,
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          flex: 1
        }} >
            <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" }} />
            <Text style={{ fontSize: 12, fontWeight: "400", color: "grey"}}>Instagram</Text>
        </Pressable>
        
        <Pressable style={{ 
          borderWidth: 0.5,
          borderColor: "grey", 
          borderRadius: 10,
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          flex: 1
        }} >
            <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" }} />
            <Text style={{ fontSize: 12, fontWeight: "400", color: "grey"}}>LinkedIn</Text>
        </Pressable>
        <Pressable style={{ 
          borderWidth: 0.5,
          borderColor: "grey", 
          borderRadius: 10,
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          flex: 1
        }} >
            <Avatar.Image size={18} source={{ uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c536.png" }} />
            <Text style={{ fontSize: 12, fontWeight: "400", color: "grey"}}>Snapchat</Text>
        </Pressable>
        <Pressable style={{ 
          borderWidth: 0.5,
          borderColor: "grey", 
          borderRadius: 10,
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          flex: 1
        }} >
            <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" }} />
            <Text style={{ fontSize: 12, fontWeight: "400", color: "grey"}}>Spotify</Text>
        </Pressable>
    
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
       
        <FontAwesome 
          name="pencil-square"
          size={32}
          color="white"
          style={{ position: "absolute", top: 50, right: 10, backgroundColor: "transparent" }}
          onPress={() => router.push("/index")}
        />

    </ScrollView>
  );
}

const User = mockUsers[0];

function Profile() {
  const styles = StyleSheet.create(
    {
    container: {
      paddingTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "transparent",
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      color: "white",
      marginTop: 5,
    },
    subTitle: {
      fontSize: 22,
      fontWeight: "600",
      color: "white",
    },
  
    separator: {
      marginVertical: 5,
      width: "100%",
    },
    profileContainer: {
      flexDirection: "row",
      paddingBottom: 20,
      backgroundColor: "transparent",
      marginTop: 200,
    },
  });
  return (
    <View style={styles.profileContainer}>
     
      <View style={{ marginLeft: 10, backgroundColor: "transparent" }}>
        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
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
        <View style={{
          borderWidth: 0.5,
          borderColor: "white",
          borderRadius: 15,
          backgroundColor: "transparent",
          width: 60,
        }}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "500", margin: 10 }}>Active</Text>
        </View>
      </View>
      
    </View>
  );
}

function Connections() {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create(
    {
    container: {
      paddingTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "transparent",
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
      marginTop: 5,
    },
    subTitle: {
      fontSize: 22,
      fontWeight: "600",
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
  
    separator: {
      marginVertical: 5,
      width: "100%",
    },
    profileContainer: {
      flexDirection: "row",
      paddingBottom: 20,
      backgroundColor: "transparent",
      marginTop: 200,
    },
  });
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 0,
        marginHorizontal: 10,
        marginTop: -20,
        padding: 10,
        borderRadius: 15,
        backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
        borderWidth: 0.5,
        borderColor: "lightgrey",
      }}
    >
      <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="eye" size={22} color="green" />
        <Text style={{ color: 
        colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        }}>Visibility</Text>
      </Pressable>
      <View style={{ width: 25 }} />
      <View style={{ width: 1, height: 40, backgroundColor: "lightgrey" }} />
      <View style={{ width: 20 }} />
     <Link
        href={{ pathname: "/connections", params: { tab: "connections" } }}
        asChild
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color:  colorScheme === "dark" ? Colors.dark.text : Colors.light.text, fontSize: 18, fontWeight: "bold" }}>149</Text>
        <Text style={{ color:  colorScheme === "dark" ? Colors.dark.text : Colors.light.text }}>Connections</Text></Pressable>
      </Link>
      <View style={{ width: 25 }} />

      <Link
        href={{ pathname: "/connections", params: { tab: "requests" } }}
        asChild
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color:  colorScheme === "dark" ? Colors.dark.text : Colors.light.text, fontSize: 18, fontWeight: "bold" }}>2</Text>
        <Text style={{ color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text}}>Requests</Text></Pressable>
      </Link>

      <View style={{ width: 25 }} />

      <Link
        href={{ pathname: "/connections", params: { tab: "pokes" } }}
        asChild
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color:  colorScheme === "dark" ? Colors.dark.text : Colors.light.text, fontSize: 18, fontWeight: "bold" }}>21</Text>
        <Text style={{ color:  colorScheme === "dark" ? Colors.dark.text : Colors.light.text }}>Pokes</Text></Pressable>
      </Link>
    </View>
  );
}


