import { Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import PeopleCard from "../../components/PeopleCard";
import { Avatar, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Alert, Button } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import SettingsCard from "../../components/SettingsCard";

export default function TabOneScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          paddingTop: 50,
          backgroundColor: Colors.secondary.main,
        }}
      >
        <UserCard />
        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginLeft: 10,
                marginTop: 15,
                flex: 1,
              }}
            >
              People Nearby
            </Text>
            <View
              style={{
                padding: 1,
                borderRadius: 15,
                backgroundColor: Colors.secondary.main,
                borderWidth: 1,
                borderColor: "lightgrey",
                marginRight: 5,
              }}
            >
              <Ionicons
                name="apps-outline"
                size={18}
                color={Colors.primary.main}
                style={{ margin: 10 }}
              />
            </View>

            <View
              style={{
                padding: 1,
                borderRadius: 15,
                backgroundColor: Colors.secondary.main,
                borderWidth: 1,
                borderColor: "lightgrey",
                marginRight: 10,
              }}
            >
              <Ionicons
                name="reorder-four-outline"
                size={18}
                color={Colors.primary.main}
                style={{ margin: 10 }}
              />
            </View>
          </View>

          <FlatList
            numColumns={2}
            key={"_"}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            shouldCancelWhenOutside={true}
            data={[
              {
                key: "Devin Jake",
                cover:
                  "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg",
              },
              { key: "Dan", cover: "https://picsum.photos/300" },
              { cover: "https://picsum.photos/300" },
              { key: "Jackson", cover: "https://picsum.photos/300" },
              { key: "James", cover: "https://picsum.photos/300" },
              { key: "Joel" },
              { key: "John" },
              { key: "Jillian" },
              { key: "Jimmy" },
              { key: "Julie" },
            ]}
            renderItem={({ item }) => (
              <PeopleCard
                name={item.key}
                bio="I am a software engineer"
                job="Software Engineer"
                cover={item.cover}
              />
            )}
            style={{ flex: 1 }}
          />
        </View>
        <View style={styles.filterButton}>
          <Pressable onPress={handlePresentModalPress}>
            <Ionicons name="location-outline" size={36} color={Colors.white} />
          </Pressable>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={styles.title}>Last Location </Text>
            <Text style={styles.title}>
              Location is only updated when you are visible and have app opened
            </Text>
            <Text>Visibility Settings</Text>
            <SettingsCard
              title="Visibility"
              subTitle="Turn on visibility to see people around you"
              icon="eye-outline"
              toggle
            />
            <SettingsCard
              title="More Settings"
              icon="settings-outline"
              subTitle="Manage all your settings"
              link="settings"
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

function UserCard() {
  return (
    <View style={{ flexDirection: "row", margin: 5, justifyContent: "center" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.statusCard}>
          <Text style={{ color: Colors.primary.main, fontSize: 18 }}>42</Text>
          <Text style={{ color: Colors.primary.main }}>People</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={{ color: Colors.primary.main, fontSize: 18 }}>4</Text>
          <Text style={{ color: Colors.primary.main }}>Connections </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("settings")}
        style={{
          marginTop: 20,
          marginLeft: 20,
          marginBottom: 20,
          marginRight: 10,
          borderWidth: 1,
          borderColor: "lightgrey",
          borderRadius: 50,
          padding: 5,
          backgroundColor: Colors.blue,
        }}
      >
        <Ionicons name="color-wand-outline" size={32} color="white" />
      </Pressable>

      <Pressable
        onPress={() => router.push("search")}
        style={{
          marginTop: 20,
          marginRight: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "lightgrey",
          borderRadius: 50,
          padding: 5,
        }}
      >
        <Ionicons name="search-outline" size={32} color={Colors.primary.main} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 10,
  },
  statusBar: {
    flexDirection: "row",
    marginTop: 5,
  },
  statusCard: {
    backgroundColor: Colors.secondary.main,
    borderWidth: 1,
    borderColor: Colors.secondary.main,
    shadowColor: Colors.primary.main,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: 10,
    padding: 15,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: Colors.primary.main,
    padding: 10,
    borderRadius: 10,
  },
});
