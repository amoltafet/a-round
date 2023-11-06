import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Switch, Card } from "react-native-paper";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 


interface SettingsCardProps {
  name?: string;
  cover?: String;
  bio?: string;
  job?: string;
}

const PeopleCard: React.FC<SettingsCardProps> = ({ name, cover, bio, job }) => {
  return (
   
    <View style={styles.container}>
      <Card style={{ flex: 1 }}>
        <Card.Cover
          source={cover ? { uri: cover } : { uri: "https://picsum.photos/700" }}
          style={{ height: 250 }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.text}>{bio}</Text>
        </View>
        <View style={styles.pokeIcon}>
          <FontAwesome name="hand-o-up" size={24} color="white" />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    width: "45%",
    backgroundBlendMode: "darken",
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },

  info: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    padding: 10,
  },
  pokeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
});

export default PeopleCard;
