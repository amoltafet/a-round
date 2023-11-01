import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { StatusBar } from "expo-status-bar";
import NotificationCard from "../components/NotificationCard";
import { FlatList } from "react-native-gesture-handler";

export default function NotifsScreen() {
  return (
    <View style={styles.container}>
      <NotificationCard
        avatar="ios-person"
        title="3 Nudges"
        subtitle="check out who wants to connect"
        color="lightblue"
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Recent</Text>
      <FlatList
        style={{ maxHeight: 175 }}
        data={[
          {
            avatar: "clipboard-outline",
            title: "New terms and agreements",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
          {
            avatar: "contract",
            title: "Photo is needed",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
          {
            avatar: "pencil",
            title: "Edit confirmed",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
        ]}
        renderItem={({ item }) => (
          <View
            style={{ marginBottom: 8 }}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          >
            <NotificationCard
              avatar={item.avatar}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
            />
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
      <Text style={styles.title}>Last Week</Text>
      <FlatList
        data={[
          {
            avatar: "ios-person",
            title: "3 Nudges",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
          {
            avatar: "pencil",
            title: "Edit confirmed",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
          {
            avatar: "ios-person",
            title: "James Rich Connected",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
          {
            avatar: "ios-person",
            title: "Michale R view your profile",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
          {
            avatar: "clipboard-outline",
            title: "3 Nudges",
            subtitle: "check out who wants to connect",
            date: "2h ago",
          },
        ]}
        renderItem={({ item }) => (
          <View
            style={{ marginBottom: 8 }}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          >
            <NotificationCard
              avatar={item.avatar}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
            />
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  separator: {
    marginVertical: 10,
    height: 1,
  },
});
