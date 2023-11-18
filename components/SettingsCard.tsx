import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Avatar, Switch } from "react-native-paper";
import Colors from "../constants/Colors";
import { Link, router } from "expo-router";
import { Pressable } from "react-native";
import StackedAvatars from "./StackedAvatars";
import mockUsers from "../app/mock/MockData";
import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

interface SettingsCardProps {
  title: string;
  subTitle?: string;
  icon?: string;
  toggle?: boolean;
  link?: string | "[...missing]";
  border?: boolean;
  avatar?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  subTitle,
  icon,
  toggle,
  link,
  border,
  avatar
}) => {
  const [toggleState, setToggleState] = useState(false);
  const handleToggle = () => {
    setToggleState(!toggleState);
  };
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        if (link) {
          router.push(link);
        } 
      } }
      style={{ backgroundColor: Colors.secondary.text }}
    >
      <View
        style={{
          flexDirection: "row",
          borderColor: "lightgrey",
          borderWidth: border ? 0.5 : 0,
          borderRadius: 10,
          padding: 5,
          margin: 3,
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        }}
      >
        {avatar ? (
          <View style={{ margin: 10, flexDirection: "row",  alignItems: 'center', }}>
        <StackedAvatars
         avatars={mockUsers.slice(3, 7).map((user) => user.avatar)}
        />
        <Avatar.Image
          size={35}
          source={{ uri: mockUsers[0].avatar }}
          style={{ backgroundColor: Colors.primary.dark }}
        />
        </View>
      ) : (
        <Ionicons name={icon} size={26} color={ colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text}
        
        style={{ margin: 10 }} />
      )}
        <View style={{ flex: 1, margin: 5, backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
          marginTop: avatar ? 10 : 5
        }}>
          <Text style={{ fontSize: 19, fontWeight: "500",
          color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        }}>{title}</Text>
          <Text style={{ fontSize: 12, color: "grey" }}>{subTitle}</Text>
        </View>
        {toggle ? (
          <Switch
            value={toggleState}
            onValueChange={handleToggle}
            style={{ margin: 10}}
            color={colorScheme === 'dark' ? DefaultTheme.colors.background : DarkTheme.colors.background }
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colorScheme === 'dark' ? DefaultTheme.colors.background : DarkTheme.colors.background }
            style={{ margin: 10, marginTop: avatar ? 15 : 10 }}
          />
        )}
       
      </View>
    </Pressable>
  );
};

export default SettingsCard;
