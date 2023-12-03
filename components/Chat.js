import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { GiftedChat } from "react-native-gifted-chat";
import { router } from "expo-router";
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import mockUsers from "../app/mock/MockData";
import { Ionicons } from "@expo/vector-icons";
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';


const Chat = ({uid}) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(auth.currentUser);
  const currentUserID = auth.currentUser.uid;
  const chatId = uid > user.uid ? currentUserID + "-" + uid : uid+ "-" +currentUserID
  const [typing, setTyping] = useState(null);

  const onSend = (messages = []) => {
    if (messages[0].text === "") {
      return;
    }
    const { _id, createdAt, text, user} = messages[0]
    addDoc(collection(db, 'chats', chatId, 'messages'), {
      _id,
      createdAt,
      text,
      user
    })
  }

  useLayoutEffect(() => {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const quickRepliesAction = () => {
    return [
      {
        title: "",
        icon: "🤣🤣🤣"
      },
      {
        title: "",
        icon: "✅"
      },
      {
        title: "",
        icon: "❤️❤️❤️"
      },
      {
        title: " Poke",
        icon: "👉"
      },
      {
        title: " Walking",
        icon: "🚶"
      },
      {
        title: " Busy",
        icon: "👨‍💻"
      }
    ];
  }

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#e6e6e6',
        paddingTop: 3,
        borderRadius: 20,
        marginHorizontal: 10,
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );

  const handleInputTextChanged = (text) => {
    if (text.length > 0) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }





  return (
    <View style={{ flex: 1 }}>
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      alwaysShowSend={true}
     // isTyping={typing ? true : false}
      //onInputTextChanged={handleInputTextChanged} 
      renderInputToolbar={renderInputToolbar}
      renderChatFooter={() => {
        return (
          <View>
          <View horizontal={true}
          showsHorizontalScrollIndicator={false}
            style={{
              padding: 10,
              flexDirection: "row",
              marginBottom: 10,
            }}>
              {quickRepliesAction().map((quickReply, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                      borderRadius: 20,
                      padding: 8,
                      backgroundColor: "#e6e6e6",
                    }}
                    onPress={() => onSend([{text: quickReply.title}])}
                  >
                    <Text>{quickReply.icon}{quickReply.title} </Text>
                  </TouchableOpacity>
                );

              })}
           
          </View>
          </View>
        );
            }
      }
      renderSend={(props) => {
        return (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
            onPress={() => props.onSend({ text: props.text.trim() }, true)}
          >
            <Ionicons name="ios-arrow-up-circle" size={32} color="black" />
          </TouchableOpacity>
        );

      }}  



      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.email,
        name: user.displayName,
        avatar: mockUsers[0].avatar,
      }}
    />
     {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  );
};

export default Chat;
