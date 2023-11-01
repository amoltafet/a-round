import React from "react";
import { View } from "./Themed";
import { Text } from "./Themed";
import Ionicons from "@expo/vector-icons/Ionicons";

interface NotificationCardProps {
  avatar: string;
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
  return (
    <View
      style={{
        flexDirection: "row",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: color,
      }}
    >
      <Ionicons name={avatar} size={24} color="black" style={{ margin: 10 }} />
      <View style={{ flex: 1, margin: 5, backgroundColor: color }}>
        <Text style={{ fontSize: 19, fontWeight: "500" }}>{title}</Text>
        <Text style={{ fontSize: 12, color: "grey" }}>{subtitle}</Text>
      </View>

      {date ? (
        <Text style={{ fontSize: 12, color: "grey", margin: 10 }}>{date}</Text>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={24}
          color="black"
          style={{ margin: 10 }}
        />
      )}
    </View>
  );
}
