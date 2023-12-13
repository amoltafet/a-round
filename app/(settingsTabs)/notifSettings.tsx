import { StyleSheet, useColorScheme } from 'react-native';
import { Text } from '../../components/Themed';
import { DefaultTheme, IconButton } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';

export default function NotifSettings() {
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

  return (
    <SafeAreaView style={styles.container}>
      <IconButton icon="arrow-left" size={25} 
        iconColor={colorTheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text}
      onPress={() => {
        router.back()
      }} style={{ marginLeft: 10, marginTop: 5 }} />
      <Text style={styles.header}>Notifications Settings</Text>
      <Text style={styles.title}>General</Text>
      <SettingsCard title="Push Notifications" subTitle='Manage your push notifications' icon="notifications-outline" toggle={true} />
      <SettingsCard title="Email Notifications" subTitle='Manage your email notifications' icon="mail-outline" toggle={true} />
      <Text style={styles.title}>Users</Text>
    
      <SettingsCard title="Leave Area" subTitle='Recieve notification when connected users leave area' icon="location-outline" toggle={true} />
      <SettingsCard title="New User Enters" subTitle='Recieve notification when new users enter area' icon="location-outline" toggle={true} />

      <Text style={styles.title}>Messages</Text>
      <SettingsCard title="New Message" subTitle='Recieve notification when you recieve a new message' icon="chatbubble-outline" toggle={true} />
      <SettingsCard title="New Connection" subTitle='Recieve notification when you connect with a new user' icon="heart-outline" toggle={true} />

      <Text style={styles.title}>Other</Text>
      <SettingsCard title="New Feature" subTitle='Recieve notification when new features are released' icon="information-circle-outline" toggle={true} />
    </SafeAreaView>
  );
}


