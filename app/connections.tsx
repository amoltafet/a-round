import React from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { Card, Chip, IconButton, Searchbar } from "react-native-paper";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import mockUsers from "./mock/MockData";
import UserCard from "../components/UserCard";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";

export default function ProfileTabs() {
  const { tab } = useLocalSearchParams<{ tab: string }>();

  const [activeIndex, setActiveIndex] = React.useState(tab);

  if (activeIndex === undefined) {
    setActiveIndex("pokes");
  }
  const FirstRoute = () => (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <Ionicons name="information-circle-outline" size={18} color="grey" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginLeft: 5,
            }}
          >
            People who you have connected with.{" "}
          </Text>
        </View>

        {mockUsers.slice(0, 3).map((user) => (
          <UserCard
            username={user.username}
            name={user.name}
            avatar={user.avatar}
            connected
          />
        ))}
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <Ionicons name="information-circle-outline" size={18} color="grey" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginLeft: 5,
            }}
          >
            People who poked you.{" "}
          </Text>
        </View>
        {mockUsers.slice(0, 10).map((user) => (
          <UserCard
            username={user.username}
            name={user.name}
            avatar={user.avatar}
            date="1 ago"
          />
        ))}
      </View>
    </ScrollView>
  );

  const FourthRoute = () => (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <Ionicons name="information-circle-outline" size={18} color="grey" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginLeft: 5,
            }}
          >
            People who you requested to connect.{" "}
          </Text>
        </View>
        {mockUsers.slice(0, 5).map((user) => (
          <UserCard
            username={user.username}
            name={user.name}
            avatar={user.avatar}
            poked
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderSection = () => {
    if (activeIndex === "connections") {
      return <FirstRoute />;
    }
    if (activeIndex === "pokes") {
      return <SecondRoute />;
    } else {
      return <FourthRoute />;
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 30,
          marginTop: 30,
        }}
      >
        <View
          style={{
            borderBottomWidth: activeIndex === "connections" ? 1 : 0,
            borderBottomColor: Colors.primary.dark,
          }}
        >
          <Pressable
            style={{ paddingBottom: 10 }}
            onPress={() => {
              setActiveIndex("connections");
            }}
          >
            <Text>Connections</Text>
          </Pressable>
        </View>
        <View
          style={{
            borderBottomWidth: activeIndex === "pokes" ? 1 : 0,
            borderBottomColor: Colors.primary.dark,
          }}
        >
          <Pressable
            style={{ paddingBottom: 10 }}
            onPress={() => {
              setActiveIndex("pokes");
            }}
          >
            <Text>Pokes</Text>
          </Pressable>
        </View>
        <View
          style={{
            borderBottomWidth: activeIndex === "requests" ? 1 : 0,
            borderBottomColor: Colors.primary.dark,
          }}
        >
          <Pressable
            style={{ paddingBottom: 10 }}
            onPress={() => {
              setActiveIndex("requests");
            }}
          >
            <Text>Requests </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.separator} />

      {renderSection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  separator: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    height: 1,
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.secondary.main,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    fontWeight: "300",
  },
  chip: {
    marginRight: 10,
  },
});
