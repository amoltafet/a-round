import { StyleSheet, useColorScheme } from 'react-native';
import { Text } from '../../components/Themed';
import { DefaultTheme, IconButton } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';

export default function Security() {
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
      <Text style={styles.header}>Security Settings</Text>
      <Text style={styles.title}>General</Text>
      <SettingsCard title="Two Factor Authentication" subTitle='Manage your two factor authentication' icon="lock-closed-outline" toggle={true} />
      <SettingsCard title="Password" subTitle='Manage your password' icon="key-outline" toggle={false} />
      <SettingsCard title="Manage Devices" subTitle='Manage your devices' icon="phone-portrait-outline" toggle={false} />

      <Text style={styles.title}>Other</Text>
      <SettingsCard title="Security Alerts" subTitle='Recieve security alerts' icon="alert-circle-outline" toggle={true} />
      <SettingsCard title='Report a Problem' subTitle='Report a problem with the app' icon="bug-outline" toggle={false} />
    </SafeAreaView>
  );
}


