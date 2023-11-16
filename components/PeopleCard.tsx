import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Switch, Card } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { Animated, Dimensions, ImageBackground, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { router, Link } from "expo-router";
import mockUsers from "../app/mock/MockData";

interface PeopleCardProps {
  name?: string;
  cover?: uri | "[...missing]";
}

const PeopleCard: React.FC<PeopleCardProps> = ({ name, cover }) => {
  const userName = name ? name : "No User Found";
  const screen = Dimensions.get("screen");
  // make connected happen out 1/10 times
  const connected = userName == mockUsers[0].username || userName == mockUsers[5].username || userName == mockUsers[7].username;
  const poked = Math.random() < 0.2;
  const [color, setColor] = useState("red");


 
  const styles = StyleSheet.create({
    container: {
      backgroundBlendMode: "darken",
      alignItems: "center",
      width: "auto",
      height: "auto",
      margin: 7,
    },
    title: {
      fontSize: 12,
      fontWeight: "400",
      marginTop: 5,
      color: "white",
    },
    
    border: {
      borderWidth: 1,
      // change border color every 100 ms
      borderColor: poked ? color : "white",
      shadowColor: "black",
      shadowOpacity: 0.3,
      backgroundColor: "lightgrey",
      borderRadius: 50,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },
  });
  return (
    <Link href={{ pathname: "/person", params: { user: name } }} asChild>
      <Pressable style={styles.container}>
        <View style={styles.border}>
          <Avatar
            rounded
            size={ screen.width / 5 }
            source={{ uri: cover }}
          > 
          {connected && (
            <Avatar.Accessory
              size={20}
              style={{ backgroundColor: "green" }}
              iconProps={{
                name: "check",
                color: "white",
              }}
            />
          )  
          }

          </Avatar>
        </View>         
         <Text style={styles.title}>{name}</Text>
      </Pressable>
    </Link>
  );
};




export default PeopleCard;
