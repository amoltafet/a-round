import { StyleSheet, useColorScheme } from 'react-native';
import { Text } from '../../components/Themed';
import { DefaultTheme, IconButton } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';

export default function Privacy() {
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
  subtext: {
    fontSize: 12,
    fontWeight: '400',
    color: 'grey',
    marginLeft: 15,
    marginVertical: 3,
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
      <Text style={styles.header}>Privacy Settings</Text>
      <Text style={styles.title}>General</Text>
      <SettingsCard title="Location" subTitle='Manage your location settings' icon="location-outline" toggle={true} />
      <SettingsCard title='Recommend Me' subTitle='Manage your recommendation settings' icon="heart-outline" toggle={true} />
      <SettingsCard title="Private Profile" subTitle='Manage your profile settings' icon="person-outline" toggle={true} />

      <Text style={styles.subtext}>When your profile is private, only users who are not connected with you, can see your full profile.</Text>
      <Text style={styles.subtext}>When your profile is public all users can see your full profile.</Text>


      <Text style={styles.title}>Other</Text>
      <SettingsCard title="Privacy Policy" subTitle='View our privacy policy' icon="document-text-outline" toggle={false} />
      <SettingsCard title='Terms of Service' subTitle='View our terms of service' icon="document-text-outline" toggle={false} />

    </SafeAreaView>
  );
}


