import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsCard from '../../components/SettingsCard';
import Colors from '../../constants/Colors';
import { Chip, Searchbar } from 'react-native-paper';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Messages() {
  return (
    <View style={styles.container}>
      <SettingsCard title='Message Requests' subTitle='See all your message requests' icon='ios-chatbubbles' border link='/search'/>
      <View style={{flexDirection: "row"}}>
      <Pressable onPress={() => router.push('/search')} style={{flex: 1}}>
        <Chip
          mode='outlined'
          style={{ margin: 10, backgroundColor: Colors.secondary.main }}
          textStyle={{ fontSize: 18 }}
        >
          <Ionicons name='search' size={18} color="black" />
          <View style={{ width: 10 }} />
          Search
        </Chip>
      </Pressable>
      <Ionicons name='filter' size={24} color={Colors.primary.main} style={{margin: 15}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.secondary.main,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});
