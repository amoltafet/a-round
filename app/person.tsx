import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsCard from '../components/SettingsCard';
import Colors from '../constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';


export default function Person() {
  // get user from param
  const { user } = useLocalSearchParams<{ user: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{user}</Text>
      <SettingsCard title="See all your pokes" icon='' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
