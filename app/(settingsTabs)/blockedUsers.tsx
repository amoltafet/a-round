import { StyleSheet, useColorScheme } from 'react-native';
import { Text } from '../../components/Themed';
import { DefaultTheme, IconButton } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../../firebase';
import mockUsers from '../mock/MockData';

export default function BlockedUsers() {
  const colorTheme = useColorScheme();
  const [blockedUsers, setBlockedUsers] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: colorTheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'grey',
    marginLeft: 15,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
  });

 useEffect(() => {
    // const getBlockedUsers = async () => {
    //     const db = getFirestore();
    //     const userRef = doc(db, "users", auth.currentUser.uid);
    //     await getDoc(userRef).then((doc) => {
    //         const blockedUsers = doc.data().blockedUsers
    //         setBlockedUsers(blockedUsers)
    //     })
    // }
    //     getBlockedUsers()
        setBlockedUsers(mockUsers)
    }, 
[])

const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <IconButton icon="arrow-left" size={25} 
        iconColor={colorTheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text}
      onPress={() => {
        router.back()
      }} style={{ marginLeft: 10, marginTop: 5 }} />
      <Text style={styles.header}>Blocked Users</Text>
     {
            blockedUsers && blockedUsers.length > 0 ?
         <Text style={{ marginLeft: 10,  marginBottom: 10 }}>You have blocked {blockedUsers.length} users</Text>
         :
         <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}>You have not blocked any users</Text>
     }
     <ScrollView style={{ flex: 1, height: "100%" }}
         onScrollToTop={() => {console.log("scrolled to top")}}
         refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
            {blockedUsers &&
            blockedUsers.map(user=>(
                <SettingsCard title={user.name} subTitle={user.email}  />
            ))} 
    </ScrollView>
    </SafeAreaView>
  );
}


