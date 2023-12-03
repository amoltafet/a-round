import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '../../firebase';

export default function ModalScreen() {
  const colorTheme = useColorScheme();
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
      height: 1,
      width: '80%',
    },
  });

  const signOutNow = () => {
    signOut(auth).then(() => {
        router.push('/login');
    }).catch((error) => {
        console.log(error)
    });
}

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings & Privacy</Text>
       <Text style={styles.title}>ACCOUNT</Text>
       <SettingsCard title="Blocked Users" subTitle='Manage your blocked users' icon="person-remove-outline" link='blockedUsers' />
       <SettingsCard title="Privacy" subTitle='Manage your privacy settings' icon="lock-closed-outline" link='privacy' />
        <SettingsCard title="Security" subTitle='Manage your security settings' icon="shield-checkmark-outline" link='security'/>
        <SettingsCard title="Notifications" subTitle='Manage your notifications' icon="notifications-outline" link='notifSettings'/>

        <View style={styles.separator} />
       <Text style={styles.title}>ABOUT</Text>
      <SettingsCard title="About a-round" subTitle='Learn more about a-round' icon="information-circle-outline" link='editProfile' />
       <SettingsCard title='Support' subTitle='Contact us for help' icon='help-circle-outline' link='editProfile'/>
       <SettingsCard title="Terms and Conditions" subTitle='Read our terms and conditions' icon="document-text-outline" link='editProfile'/>

       <View style={styles.separator} />
       <Pressable onPress={signOutNow}>
        <Text style={styles.title}>Log Out</Text>
        </Pressable>

       <View style={styles.separator} />
       <Text style={styles.title}>You joined a-round on November 5, 2021 </Text>

       
    </SafeAreaView>
  );
}
