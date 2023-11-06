import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsCard from '../../components/SettingsCard';
import Colors from '../../constants/Colors';

export default function Messages() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages & Pokes</Text>
      <SettingsCard title="See all your pokes" icon='' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 10,
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
