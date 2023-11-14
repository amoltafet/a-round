import { Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import PeopleCard from "../../components/PeopleCard";
import { Avatar, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {  ScrollView } from "react-native-gesture-handler";
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
import mockUsers from "../mock/MockData";

export default function TabOneScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["30%", "30%"], []);

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
        <View style={{ flexDirection: "row", margin: 10, gap: 20 }}>
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary.main,
            borderWidth: 3, borderColor: Colors.primary.third, borderRadius: 15, padding: 10, flex: 1 }}>
              <Ionicons name="time" size={38} color={Colors.primary.secondary} />
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>Time
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary.main,
            borderWidth: 3, borderColor: Colors.primary.third,  borderRadius: 15, padding: 10, flex:1 }}>
              <Ionicons name="tennisball" size={38} color="white" />
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>Activity
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary.main,
            borderWidth: 3, borderColor: Colors.primary.third,  borderRadius: 15, padding: 10, flex:1 }}>
              <Ionicons name="share" size={38} color="white" />
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>
                Share
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary.main,
            borderWidth: 3, borderColor: Colors.primary.third,  borderRadius: 15, padding: 10, flex:1 }}>
              <Ionicons name="information" size={38} color="white" />
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>
                Info
              </Text>
            </View>
        </View>

        <View style={styles.statusBar}>
          <SettingsCard
            title="See who poked you!"
            subTitle="80 pokes this week"
            icon="hand-left-outline"
            link="connections"
            border
          />
        </View>
      
        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 15,
          backgroundColor: Colors.primary.main,
        }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginLeft: 10,
                marginTop: 10,
                flex: 1,
                color: Colors.secondary.main,
              }}
            >
              People Near You
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
              <Avatar.Text
                size={30}
                label="13"
                style={{ backgroundColor: Colors.primary.main }}
              />
            </View>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                backgroundColor: Colors.primary.main,
                flex: 1,
              }}
            >
              {mockUsers.map((user) => (
                <PeopleCard
                  key={user.id}
                  name={user.username}
                  cover={user.avatar}
                />
              ))}
              <PeopleCard
                name="22 Hidden"
                cover="https://img.freepik.com/premium-vector/unknown-person-hidden-identity-icon-line_116137-5748.jpg"
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.filterButton}>
          <Pressable onPress={handlePresentModalPress}>
            <Ionicons
              name="eye-outline"
              size={36}
              color={Colors.primary.main}
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
            subTitle="Manage all your settings and privacy"
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
      <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
            Location
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location" size={18} color={Colors.primary.main} />
            <Text style={{ fontSize: 19, fontWeight: "500" }}> EastSide Bar, Seattle</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("search")}
        style={{
          marginTop: 20,
          marginRight: 20,
          marginBottom: 10,
          borderWidth: 3,
          borderColor: Colors.primary.third, 
          borderRadius: 50,
          padding: 5,
          backgroundColor: Colors.primary.main,
        }}
      >
        <Ionicons name="search-outline" size={22} color={Colors.secondary.main} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.primary.main,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 3, 
    borderColor: Colors.primary.third, 
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
    backgroundColor: Colors.secondary.main,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    borderWidth: 3, 
    borderColor: Colors.primary.third, 
  },
});
