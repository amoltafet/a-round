import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsCard from "../components/SettingsCard";
import Colors from "../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import mockUsers from "./mock/MockData";
import { useState } from "react";
import { Avatar, IconButton } from "react-native-paper";
import ProfileTabs from "../components/ProfileTabs";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Person() {
  // get user from param
  const user  = mockUsers[0];
  const colorScheme = useColorScheme();
  return (
      <ScrollView showsHorizontalScrollIndicator={false} 
        showsVerticalScrollIndicator={false} 
        alwaysBounceHorizontal={false}
        bounces={false}
          style={{ paddingBottom: 80, backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background
          }}
        >
          <Image source={{ uri: "https://media.licdn.com/dms/image/C4E03AQH5b8z18kBWiA/profile-displayphoto-shrink_800_800/0/1526331777660?e=1705536000&v=beta&t=AOlXp_JXeWWQOwEK8WemEZ_XOPE0tO5Lfx9hRizy6_o" }} style={{ width: "100%", height: 350, overflow: "hidden", 
          backgroundColor: "rgba(0,0,0,0.3)",
        }} >
          <Profile />
          </Image>
          
          <Connections />
        
      
      <ProfileTabs />
      <IconButton
        icon="arrow-left"
        size={22}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          backgroundColor: Colors.secondary.main,
        }}
        onPress={() => router.push("/map")}
      />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.secondary.main,
  },
  profileContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    paddingTop: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: "500",
    color: "grey",
    paddingTop: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});


function Profile() {
  const User = mockUsers[0];
  const styles = StyleSheet.create(
    {
    container: {
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
