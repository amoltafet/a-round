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
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import SettingsCard from "../../components/SettingsCard";

export default function TabOneScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
      />
    ),
    []
  );

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
        <View style={styles.statusBar}>
          <SettingsCard
            title="See who poked you!"
            subTitle="80 pokes this week"
            icon="hand-left-outline"
            link="messages"
            border
          />
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginLeft: 10,
                marginTop: 10,
                flex: 1,
              }}
            >
              People Nearby
            </Text>
            
            <View
              style={{
                padding: 1,
                borderRadius: 15,
                backgroundColor: Colors.primary.main,
                borderWidth: 1,
                borderColor: Colors.primary.main,
                marginRight: 5,
              }}
            >
              <Ionicons
                name="apps-outline"
                size={12}
                color={Colors.secondary.main}
                style={{ margin: 10 }}
              />
            </View>

            <View
              style={{
                padding: 1,
                borderRadius: 15,
                backgroundColor: Colors.secondary.main,
                borderWidth: 1,
                borderColor: Colors.primary.main,
                marginRight: 10,
              }}
            >
              <Ionicons
                name="reorder-four-outline"
                size={12}
                color={Colors.primary.main}
                style={{ margin: 10 }}
              />
            </View>
          </View>

          <FlatList
            numColumns={4}
            key={"_"}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            shouldCancelWhenOutside={true}
            data={[
              {
                key: "Devin ",
                cover:
                  "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg",
              },
              { key: "Dan", cover: "https://picsum.photos/300" },
              { key: "Jakon", cover: "https://picsum.photos/300" },
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
                cover={item.cover}
              />
            )}
          />
        </View>
        <View style={styles.filterButton}>
          <Pressable onPress={handlePresentModalPress}>
            <Ionicons
              name="eye-outline"
              size={36}
              color={Colors.secondary.main}
            />
          </Pressable>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={styles.title}>Visibility Settings</Text>
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
            border
          />
        </View>
      </BottomSheetModal>

      
    </BottomSheetModalProvider>
  );
}

function UserCard() {
  return (
    <View style={{ flexDirection: "row", margin: 5, justifyContent: "center" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ color: Colors.primary.main, fontSize
          : 28, fontWeight: "700", paddingLeft: 20, paddingTop: 30,
          }}>IceBreaker.</Text>
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
          backgroundColor: Colors.primary.main,
          
        }}
        
      >
        <Ionicons name="information-outline" size={32} color="white" />
      </Pressable>

      <Pressable
        onPress={() => router.push("search")}
        style={{
          marginTop: 20,
          marginRight: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: Colors.primary.main,
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
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 10,
  },
  statusBar: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,

    
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
