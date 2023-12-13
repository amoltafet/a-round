import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsCard from '../components/SettingsCard';
import Colors from '../constants/Colors';
import { SearchBar } from 'react-native-elements';
import mockUsers from './mock/MockData';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { ScrollView } from 'react-native-gesture-handler';
import Chat from '../components/Chat';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Avatar } from 'react-native-paper';

export default function ChatScreen() {
  const {toUser} = useLocalSearchParams<{toUser: string}>() 
  console.log(toUser)
  const [user, setUser] = useState <any>({})

  useEffect(()=>{
    const getUser = async ()=> {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const users = querySnapshot.docs.map(docSnap=>docSnap.data())
      const user = users.find(user=>user.id === toUser)

      setUser(user)
    }
    getUser()
  } ,[])

  return (
    <SafeAreaView style={styles.container}>
       <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.2, borderColor: "grey" }}>
        <Pressable onPress={() => router.back()}>
        <Ionicons name='arrow-back-circle' size={30} color='grey' />
        </Pressable>
        
        {
          user?.online && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'green', marginLeft: 10, marginTop: 10 }} />
        }
        {
          user?.avatar && <Avatar.Image size={32} source={{ uri: user.avatar }} style={{marginLeft: 15}}/>
        }
        {/* <Avatar.Image size={32} source={{ uri: user.avatar }} style={{marginLeft: 15}}/> */}
        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10, marginTop: 5 }}> 
          {user.name}
        </Text>

        <Pressable style={{ marginLeft: "auto", marginRight: 10 }}>
          <Ionicons name='shield' size={22} color='grey' />
        </Pressable>
      </View>
       <Chat uid={toUser}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
