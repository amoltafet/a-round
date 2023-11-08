import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { StatusBar } from "expo-status-bar";
import NotificationCard from "../components/NotificationCard";
import { FlatList } from "react-native-gesture-handler";
import SettingsCard from "../components/SettingsCard";

export default function NotifsScreen() {
  return (
    <View style={styles.container}>
      <SettingsCard
        title="Nudge Requests"
        subTitle="Approve or deny your nudge requests!"
        icon="notifications-outline"
        border
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Recent</Text>
      <FlatList
        data={[
          {
            title: "Sidiq Moltafet",
            subtitle: "has requested to nudge you.",
            date: "2h ago",
            color: "white",
          },
          {
            title: "Hudson Burdick",
            subtitle: "has requested to nudge you.",
            date: "2h ago",
            color: "white",
          },
          {
            title: "James Rich",
            subtitle: "has viewed your profile.",
            date: "2h ago",
            color: "white",
          },
          {
            title: "Jesiica Rudoff",
            subtitle: "who you, might know, is on a-round",
            date: "2h ago",
            color: "white",
            
          },
          {
            title: "Melika Soucof",
            subtitle: "is at the same location as you",
            date: "2h ago",
            color: "white",
          },
          {
            title: "James Rich",
            subtitle: "traveled to Spokane, Washington",
            date: "2h ago",
            color: "white",
          },
          {
            title: "Michale Rosu",
            subtitle: "had viewed your profile",
            date: "2h ago",
            color: "white",
          },
          {
            title: "You have mutiple nudge requests",
            subtitle: "approve or deny your nudge requests!",
            date: "2h ago",
            color: "white",
          },
        ]}
        renderItem={({ item }) => (
          <View
            style={{ marginBottom: 10 }}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          >
            <NotificationCard
              avatar={item.avatar}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              color={item.color}
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
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
  },
});
