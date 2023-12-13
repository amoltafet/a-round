import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Platform, Pressable, RefreshControl, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { StatusBar } from "expo-status-bar";
import NotificationCard from "../../components/NotificationCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SettingsCard from "../../components/SettingsCard";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { DarkTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function NotifsScreen() {
  const colorTheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      backgroundColor: colorTheme === 'dark' ? DarkTheme.colors.background : Colors.light.background,
    },
    title: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 10,
      marginLeft: 10,
      marginTop: 10,
    },
    separator: {
      marginVertical: 10,
      height: 1,
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useLayoutEffect(() => {
    const q = query(collection(db, "users", auth.currentUser.uid, "notifications"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setNotifications(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          avatar: doc.data().avatar,
          title: doc.data().title,
          subtitle: doc.data().subtitle,
          date: doc.data().date,
          color: doc.data().color,
        }))
      ),
    );
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent"}}>
      <Text style={styles.header}>Notifications</Text>
      <Pressable onPress={() => {}}>
        <Text style={{ color: Colors.light.tint, marginTop: 15, marginRight: 15, fontSize: 15 }}>Filter</Text>
      </Pressable>
      </View>
      <SettingsCard
        title="Wave Requests"
        subTitle="Approve or deny your poke requests!"
        icon="hand-left-outline"
        link="/connections"
      />
     
      <Text style={styles.title}>Recent</Text>
      
      <ScrollView style={{ flex: 1, height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        { 
       notifications.length === 0 ?
        <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}>You have no notifications</Text>
        :
          notifications.map((notification) => (
            <NotificationCard
              avatar={notification.avatar}
              title={notification.title}
              subtitle={notification.subtitle}
              date={notification.date}
              color={notification.color}
            />
          ))}
      </ScrollView>
    </SafeAreaView>

  );
}

