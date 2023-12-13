import { Button, Pressable, RefreshControl, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import SettingsCard from '../../components/SettingsCard';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Avatar, IconButton } from 'react-native-paper';
import mockUsers from '../mock/MockData';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getFirestore, collection, getDocs, onSnapshot, query, getDoc, doc  } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { UsersNerby, nerbyUsers as newNerby } from '../../state/UsersNerby';
import moment from 'moment';


// Figma: https://www.pinterest.com/pin/656188608228183206/visual-search/?x=16&y=16&w=532&h=390

export default function Messages() {
  const colorTheme = useColorScheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["85%", "85%"], []);
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState()
  
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
      />
    ),
    []
  );
  const db = getFirestore();

  const getMessages = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await getDoc(userRef).then((doc) => {
        const chats = doc.data().chats
        const chatArray = []
        for (const [key, value] of Object.entries(chats)) {
          chatArray.push(value)
        }
        setMessages(chatArray)
    })
  }
  useEffect(() => {   
    getMessages();
  }, []);

  const [nerbyUsers, setNerbyUsers] = useState([])
  UsersNerby();

  useLayoutEffect(() => {
      const timer = setInterval(() => {
        setNerbyUsers(prevUsers => {
          if (JSON.stringify(newNerby) !== JSON.stringify(prevUsers)) {
            return newNerby;
          }
    
          // If they are the same, return the previous state without changes
          return prevUsers;
        });      
      }
      , 9000);

      return () => clearInterval(timer);
  } , [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMessages();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
       <Text style={styles.header}>Messages</Text>
       
       <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
       <IconButton icon="message-plus" size={25} 
        style={{ marginRight: 10, marginTop: 5 }}
         onPress={() => {handlePresentModalPress()}}
       /> 

       <IconButton icon="comment-search" size={25} 
        style={{ marginRight: 10, marginTop: 5 }}
       onPress={() => {router.push('/settings')}}/>
        </View>
      </View>
   
      <ScrollView style={{ flex: 1, height: "100%" }} 
        onScrollToTop={() => {console.log("scrolled to top")}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      <Text style={{ fontSize: 15, fontWeight: "600", marginLeft: 15, color: "grey" }}>Recent</Text>
      <View style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 15,
        position: "sticky",
      }}>
        
       {
        messages && messages.length > 0 && messages.slice(0, 3).map((user, index) => {
        return (
          
            <View style={{ marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
            }} key={index}>
              <Link href={{ pathname: "/chat", params: { toUser: user.to } }}>
                {/* <Avatar.Image key={index} size={64} source={{ uri: user.avatar }} /> */}
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
                    fontSize: 10,
                    paddingTop: 3,
                    fontWeight: "400",
                    color: "grey",
                }}
                >
                {user.lastSeen ? //convert to time ago
                    user.lastSeen.substring(0, 10) : "last seen"}
                </Text>
            </View>
          )
        }
          )
          
            
        }
      </View>

        { 
        messages && messages.length > 0 && messages.map((user, index) => (
        <ChatCard user={user} key={index}/>
      ))}  
        {
        messages &&
        Object.entries(messages).length === 0 ? <Text style={{textAlign: "center", fontSize: 16, marginTop: 20}}>No messages yet</Text> : <></>}
        </ScrollView>
            
    </SafeAreaView>
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}       
    >
      <NewMessageView nerbyUsers={nerbyUsers}/>
  </BottomSheetModal>
</BottomSheetModalProvider>
    
  );
}

const NewMessageView = ({nerbyUsers}) => {
  const colorScheme = useColorScheme();
  const [connectedUsers, setConnectedUsers] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const getUser = async ()=> {
      const querySnapshot = await getDoc(doc(db, 'users', auth.currentUser.uid))
      const users = querySnapshot.data().connections
      setConnectedUsers (users)
    }
    getUser()
    console.log(connectedUsers)
  }
  , [])
  return (
      <View style={{ flex: 1, padding: 20, backgroundColor: "white", gap: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "600"}}>New Message</Text>
        <TextInput placeholder="Search" style={{ marginTop: 10, fontSize: 16, fontWeight: "400", padding: 10, backgroundColor: "lightgrey", borderRadius: 10 }} />
        <SettingsCard title="New Group" subTitle="Start a new group chat" icon="people-outline" border/>
        
        <ScrollView style={{ flex: 1, height: "100%" }} >
          {connectedUsers.length === 0 ? <>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "grey" }}>No Connections</Text>
          </> : 
          <Text style={{ fontSize: 15, fontWeight: "600", color: "grey" }}>Connected</Text>}
          
          <ScrollView horizontal style={{padding: 10}}>
          
          { connectedUsers.filter((user, index) => index < 3).map((user, index) => (
                <View style={{ marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }} key={index}>
                  <Avatar.Image key={index} size={48} source={{ uri: user.avatar }} />
                    <Text
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                        paddingTop: 5,
                        fontWeight: "600",
                    }}
                    >
                    {user.username}
                    </Text>
                    <Text
                    style={{
                        textAlign: "center",
                        fontSize: 10,
                        paddingTop: 3,
                        fontWeight: "400",
                        color: "grey",
                    }}
                    >
                    {user.lastSeen ? //convert to time ago
                        user.lastSeen.substring(0, 10) : "last seen"}
                    </Text>
                </View>
              ))
                
            }
          </ScrollView>
          {
            nerbyUsers.length === 0 ?
            <Text style={{ fontSize: 15, fontWeight: "600", color: "grey" }}>No Nearby Users</Text>
           :
            <Text style={{ fontSize: 15, fontWeight: "600", color: "grey" }}>Nearby</Text>
          }
            {
              nerbyUsers.map((user, index) => (
                <ChatCard user={user} key={index}/>
              ))
            }
            

        </ScrollView>

      </View>
  )

}

const ChatCard = ({user}) => {
    const colorScheme = useColorScheme();
    const [toUser, setToUser] = useState()
    const [loading, setLoading] = useState(true)
   
    useEffect(()=>{
      const getUser = async ()=> {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const users = querySnapshot.docs.map(docSnap=>docSnap.data())
        const u = users.find(u=>u.id === user.to)
  
        setToUser(u)
      }
      getUser()
      console.log(toUser)
    } ,[])

    if (loading) {
      return <></>
    }

    return (
      <Link href={{ pathname: "/chat", params: { toUser: user.to } }} asChild key={user.id}> 
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
            size={38}
            source={{ uri: toUser.avatar }}
            style={{ backgroundColor: Colors.primary.dark, marginTop: 4 }}
          />
        
          <View style={{ flex: 1, margin: 5, backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
          }}>
            <Text style={{ fontSize: 16, fontWeight: "500",
            color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
          }}> {toUser.name}</Text>
            <Text style={{ fontSize: 12, color: "grey", marginLeft: 5 }}>
                {toUser.username} • {user.lastSeen ? getTimeDifference(user.lastSeen) : "now"}
            </Text>
          </View>

            
            <Ionicons
              name="chatbox-outline"
              size={24}
              color="grey"
              style={{ margin: 10, marginTop:  15 }}
            />
        </View>
        </Pressable>
      </Link>
    )
}

function getTimeDifference(lastSeen) {
  const now = moment();
  const lastSeenMoment = moment(lastSeen, "MM/DD/YYYY, h:mm:ss A");
  return lastSeenMoment.fromNow();
}

