import React from "react";
import { View } from "./Themed";
import { Text } from "./Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar } from "react-native-paper";

interface NotificationCardProps {
  avatar?: string;
  title: string;
  subtitle: string;
  date?: string;
  color?: string;
  name?: string;
}

export default function NotificationCard({
  avatar,
  title,
  subtitle,
  date,
  color,
  name,
}: NotificationCardProps): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: color,
      }}
    >
        {avatar ? (
      <Avatar.Text size={24} label={avatar} style={{ margin: 12 }} />
    ) : (
        <Avatar.Text size={24} label="XD" style={{ margin: 10 }} />
    )}
      <View style={{ flex: 1, margin: 5.5, backgroundColor: color }}>      
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 12, color: "black" }}>{subtitle}</Text>
      </View>

      {date ? (
        <Text style={{ fontSize: 12, color: "black", margin: 12 }}>{date}</Text>
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
