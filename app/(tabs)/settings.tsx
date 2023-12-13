import { Pressable, SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import SettingsCard from '../../components/SettingsCard';

import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '../../firebase';
import UserLocation from '../../state/UserLocation';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export default function ModalScreen() {
  const colorTheme = useColorScheme();
  const [user, setUser] = useState(null);
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
      marginTop: 20,
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
      width: '80%',
    },
    button: {
      backgroundColor: 'white',
      borderWidth: 0.2,
      borderColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginHorizontal: 10,
      marginBottom: 20,
      height: 50,
    }
  });

  const signOutNow = () => {

    signOut(auth).then(() => {
        router.push('/login');
    }).catch((error) => {
        console.log(error)
    });
  }

  useEffect(() => {
    const getUser = async () => {
        const db = getFirestore();
        const userRef = doc(db, "users", auth.currentUser.uid);
        await getDoc(userRef).then((doc) => {
            setUser(doc.data())
        })
    }
        getUser()
    }, 
  [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings & Privacy</Text>
      <ScrollView style={{ flex: 1, backgroundColor: "transparent", margin: 0, paddingBottom: 0, marginBottom: 0 }}>      
       <Text style={styles.title}>General</Text>
       <SettingsCard title="Blocked Users" subTitle='Manage your blocked users' icon="person-remove-outline" link='blockedUsers' props={user}/>
       <SettingsCard title="Privacy" subTitle='Manage your privacy settings' icon="lock-closed-outline" link='privacy' />
        <SettingsCard title="Security" subTitle='Manage your security settings' icon="shield-checkmark-outline" link='security'/>
        <SettingsCard title="Notifications" subTitle='Manage your notifications' icon="notifications-outline" link='notifSettings'/>
        <SettingsCard title='Location Preferences' subTitle='Manage your location preferences' icon="location-outline" link='locationPreferences' />
        <View style={styles.separator} />
       <Text style={styles.title}>About</Text>
      <SettingsCard title="About Peal" subTitle='Learn more about our app' icon="information-circle-outline" link='editProfile' />
       <SettingsCard title='Support' subTitle='Contact us for help' icon='help-circle-outline' link='editProfile'/>
       <SettingsCard title="Terms and Conditions" subTitle='Read our terms and conditions' icon="document-text-outline" link='editProfile'/>


       <View style={styles.separator} />
      

        <SettingsCard title='Delete Account' subTitle='Delete your account' icon='trash-outline' link='editProfile'/>

       <View style={styles.separator} />
       <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10, backgroundColor: "transparent" }}>
       <Text style={styles.title}>You joined a-round on November 5, 2021 </Text>
        </View>
        <Pressable onPress={signOutNow} style={styles.button}>
        <Text style={styles.title}>Log Out</Text>
        </Pressable>
        </ScrollView>
      </SafeAreaView>
  );
}
