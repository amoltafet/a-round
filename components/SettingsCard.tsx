import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Switch } from "react-native-paper";
import Colors from "../constants/Colors";
import { Link, router } from "expo-router";
import { Pressable } from "react-native";

interface SettingsCardProps {
  title: string;
  subTitle?: string;
  icon?: string;
  toggle?: boolean;
  link?: string | "[...missing]";
  border?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  subTitle,
  icon,
  toggle,
  link,
  border,
}) => {
  const [toggleState, setToggleState] = useState(false);
  const handleToggle = () => {
    setToggleState(!toggleState);
  };

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
          backgroundColor: Colors.primary.text,
        }}
      >
        <Ionicons name={icon} size={26} color={Colors.primary.dark} style={{ margin: 10 }} />
        <View style={{ flex: 1, margin: 5, backgroundColor: Colors.primary.text }}>
          <Text style={{ fontSize: 19, fontWeight: "500" }}>{title}</Text>
          <Text style={{ fontSize: 12, color: "grey" }}>{subTitle}</Text>
        </View>
        {toggle ? (
          <Switch
            value={toggleState}
            onValueChange={handleToggle}
            style={{ margin: 10 }}
            color={Colors.primary.dark}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.primary.dark}
            style={{ margin: 10 }}
          />
        )}
      </View>
    </Pressable>
  );
};

export default SettingsCard;
