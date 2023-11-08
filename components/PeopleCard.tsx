import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Switch, Card, Avatar } from "react-native-paper";
import { ImageBackground, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from "../constants/Colors";
import { router, Link } from "expo-router";

interface SettingsCardProps {
  name?: string;
  cover?: String;
}

const PeopleCard: React.FC<SettingsCardProps> = ({ name, cover }) => {
  const userName = name ? name : "No User Found";
  return (
 
    <View style={styles.container}>
      
      <View style={styles.border}>  
      <Link href={{ pathname: "/person", params: { user: userName } }} style={{
        marginTop: 3.5,
      }} 
      
      >
        <Avatar.Image style={styles.avatar} size={84} source={cover ? { uri: cover } : { uri: "https://unsplash.com/s/photos/profile-pictures" }} />
      </Link>
       </View> 
       <Text style={styles.title}>@{name}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundBlendMode: "darken",
    alignItems: "center",
    
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 5,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderWidth: 4,
    borderColor: Colors.secondary.main,
    shadowColor: "black",
    shadowOpacity: 0.5,
    backgroundColor: "lightgrey",
    borderRadius: 50,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  }

  
});

export default PeopleCard;
