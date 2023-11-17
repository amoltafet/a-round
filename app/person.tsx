import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsCard from "../components/SettingsCard";
import Colors from "../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import mockUsers from "./mock/MockData";
import { useState } from "react";
import { Avatar } from "react-native-paper";
import ProfileTabs from "../components/ProfileTabs";
import { Link } from "expo-router";

export default function Person() {
  // get user from param
  const { user } = useLocalSearchParams<{ user: string }>();

  const [currentUser, setCurrentUser] = useState(
    mockUsers.find((u) => u.username === user)
  );

  return (
    <View style={styles.container}>
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
          <Avatar.Image size={86} source={{ uri: currentUser?.avatar }} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{currentUser?.name}</Text>
          <Text style={styles.username}>@{currentUser?.username}</Text>
          <Text style={styles.username}>
            Seattle · {currentUser?.connections} Connections
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Link
          href={{ pathname: "/connections", params: { tab: "connections" } }}
        >
          <View
            style={{
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{ color: "black", backgroundColor: Colors.secondary.main }}
            >
              Poke {currentUser?.name}
            </Text>
          </View>
        </Link>
        <View style={{ width: 10 }} />

        <Link href={{ pathname: "/messages", params: { tab: "requests" } }}>
          <View
            style={{
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              paddingHorizontal: 15,
            }}>
            <Text
              style={{ color: "black", backgroundColor: Colors.secondary.main }}>
              Message
            </Text>
          </View>
        </Link>
        <View style={{ width: 10 }} />

        <Link href={{ pathname: "/messages", params: { tab: "requests" } }}>
          <View
            style={{
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              paddingHorizontal: 15,
              backgroundColor: "lightgrey",
            }}>
            <Text
              style={{ color: "black" }}>
              single
            </Text>
          </View>
        </Link>
       
      </View>
      
      <ProfileTabs />
    </View>
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
