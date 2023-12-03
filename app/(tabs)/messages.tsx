import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Avatar } from 'react-native-paper';
import mockUsers from '../mock/MockData';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs  } from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from '../../firebase';

export default function Messages() {
  const colorTheme = useColorScheme();
  
  const [users, setUsers] = useState([])
  
  const getUsers = async ()=> {
    const userCol = collection(db, 'users')
    const querySnapshot = await getDocs(userCol)
    const allUsers = querySnapshot.docs.map(docSnap=>docSnap.data())
    setUsers(allUsers.filter(user=>user.id !== auth.currentUser.uid))
  }
    
  useEffect(()=>{
        getUsers()
  },[])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorTheme === 'dark' ? DarkTheme.colors.background : "#fff",
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      marginLeft: 10,
      marginTop: 20,
      marginBottom: 20,
    },
  });

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <ScrollView style={{ flex: 1, height: "100%" }} 
        onScrollToTop={() => {console.log("scrolled to top")}}

      >
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        position: "sticky",
      }}>
       {
        users.filter((user, index) => index < 3).map((user, index) => (
          
            <View style={{ marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
            }} key={index}>
              <Link href={{ pathname: "/chat", params: { toUser: user.id } }}>
                <Avatar.Image key={index} size={64} source={{ uri: user.avatar }} />
                </Link>
                <Text
                style={{
                    textAlign: "center",
                    fontSize: 12,
                    paddingTop: 5,
                    fontWeight: "600",
                }}
                >
                {user.name}
                </Text>
                <Text
                style={{
                    textAlign: "center",
                    fontSize: 12,
                    paddingTop: 3,
                    fontWeight: "600",
                    color: "grey",
                }}
                >
                {user.lastSeen ? user.lastSeen : "now"}
                </Text>
            </View>
            ))
            
        }
        <View style={{ marginRight: 20 }} >
                <Avatar.Icon size={64} icon="plus" />
                    <Text
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                        paddingTop: 5,
                        fontWeight: "600",
                    }}
                    >
                   new chat
                    </Text>
               
            </View>
        </View>

            {users.map((user, index) => (
            <ChatCard user={user} key={user.id}/>
        ))}  
        {users.length === 0 ? <Text style={{textAlign: "center", fontSize: 18, marginTop: 20}}>No messages yet</Text> : <></>}
        </ScrollView>
            
    </SafeAreaView>
    
  );
}


const ChatCard = ({user}) => {
    const colorScheme = useColorScheme();
    return (
      <Link href={{ pathname: "/chat", params: { toUser: user.id } }} asChild > 
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            borderColor: "lightgrey",
            borderTopWidth: 0.3,
            borderBottomWidth: 0.3,
            padding: 10,
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
          }} >
          <Avatar.Image
            size={40}
            source={{ uri: user.avatar }}
            style={{ backgroundColor: Colors.primary.dark, marginTop: 4 }}
          />
        
          <View style={{ flex: 1, margin: 5, backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
          }}>
            <Text style={{ fontSize: 19, fontWeight: "500",
            color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
          }}> {user.name}</Text>
            <Text style={{ fontSize: 12, color: "grey", marginLeft: 5 }}>
                {user.username} {user.lastSeen ? " - " + user.lastSeen : ""}</Text>
          </View>
            
            <Ionicons
              name="chatbox-outline"
              size={24}
              color="grey"
              style={{ margin: 10, marginTop:  15 }}
            />
          
         
        </View></Pressable>
      </Link>
    )
}
