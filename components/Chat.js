import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { GiftedChat } from "react-native-gifted-chat";
import { router } from "expo-router";
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import mockUsers from "../app/mock/MockData";


const Chat = () => {
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

   // addDoc(collection(db, "chats"), { _id, createdAt, text, user });
    // wait 2 seconds simulate the message being sent
    setTimeout(() => {
      messages.push({
        // create a fake response
        _id: messages[0]._id + 1,
        text: "Hello Ahmad",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    }
    , 2000);
  }, []);

  useLayoutEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
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

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        
      },
    ]);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: mockUsers[0].avatar,
      }}
    />
  );
};

export default Chat;
