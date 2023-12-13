import React from "react";
import { View } from "./Themed";
import { Text } from "./Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
interface NotificationCardProps {
  avatar?: string;
  title: string;
  subtitle: string;
  date?: string;
  color?: string;
}

export default function NotificationCard({
  avatar,
  title,
  subtitle,
  date,
  color,
}: NotificationCardProps): JSX.Element {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background: Colors.light.background,
      }}
    >
        {avatar ? (
      <Avatar.Image size={32} source={{uri: avatar}} style={{ margin: 12}} />
    ) : (
        <Avatar.Text size={32} label="XD" style={{ margin: 10 }} />
    )}
      <View style={{ flex: 1, marginTop: 15, backgroundColor: colorScheme === 'dark' ? Colors.dark.background: Colors.light.background, }}>     
        <Text style={{ fontSize: 14, fontWeight: "600" }}>{title}</Text>
        <Text style={{ fontSize: 10, color: "grey" }}>{subtitle}</Text>
      </View>

      {date ? (
        <Text style={{ fontSize: 12, color: colorScheme === 'dark' ? Colors.dark.text: Colors.light.text, margin: 12 }}>{date}</Text>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={24}
          color="white"
          style={{ margin: 10 }}
        />
      )}
    </View>
  );
}
