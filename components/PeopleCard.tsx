import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Switch, Card } from "react-native-paper";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";

interface SettingsCardProps {
  name?: string;
  cover?: String;
  bio?: string;
  job?: string;
}

const PeopleCard: React.FC<SettingsCardProps> = ({ name, cover, bio, job }) => {
  const skeletonCard = () => {
    return <View style={styles.container}>
      <Card style={{ flex: 1 }}>
      <Card.Cover
          source={cover ? { uri: cover } : { uri: "https://picsum.photos/22" }}
          style={{ height: 250 }}
        />
        <View style={styles.info}>
          <Text style={styles.title}></Text>
          <Text style={styles.text}></Text>
        </View>
    </Card>

    </View>;
  };

    if (!name) {
        return skeletonCard();
    }

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
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 250,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    width: "50%",
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
    padding: 10,
  },
});

export default PeopleCard;
