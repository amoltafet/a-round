import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsCard from '../components/SettingsCard';
import Colors from '../constants/Colors';
import { SearchBar } from 'react-native-elements';
import mockUsers from './mock/MockData';
import { useState } from 'react';
import UserCard from '../components/UserCard';
import { ScrollView } from 'react-native-gesture-handler';
import Chat from '../components/Chat';

export default function ChatScreen() {


  return (
    <SafeAreaView style={styles.container}>
       <Chat />
    </SafeAreaView>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
