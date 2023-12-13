import { StyleSheet, useColorScheme } from 'react-native';
import { Text } from '../../components/Themed';
import { DefaultTheme, IconButton } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import UserLocation from '../../state/UserLocation';
import { Slider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function LocationPreferences() {
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
      <Text style={styles.header}>Location Preferences</Text>
      <Text style={styles.title}>Location</Text>
      <UserLocation />
      
      <Text style={styles.title}>Distance</Text>
      <Slider
        value={20}
        onValueChange={value => console.log(value)}
        maximumValue={10}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 25, width: 25, backgroundColor: 'black' }}
        thumbProps={{
          children: (
            <Ionicons
              name="ios-heart-circle"
              size={25}
              style={{ backgroundColor: 'transparent' }}
              containerStyle={{ bottom: 20, right: 20 }}
              color={colorTheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text}
            />
          ),
        }}
      />


    </SafeAreaView>
  );
}
