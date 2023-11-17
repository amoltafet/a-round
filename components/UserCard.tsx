import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Avatar, Chip, Switch } from "react-native-paper";
import Colors from "../constants/Colors";
import { Link, router } from "expo-router";
import { Pressable } from "react-native";
import { useColorScheme } from "react-native";

interface UserCardProps {
  avatar: string;
  name: string;
  username: string;
  connected?: boolean;
  poked?: boolean;
  viewed?: boolean;
  joined?: boolean;
  date?: string;
  link?: string | "[...missing]";
  arrow?: boolean;
  chat?: boolean;
  border?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  avatar,
  name,
  username,
  connected,
  poked,
  viewed,
  joined,
  link,
  date,
  arrow,
  chat,
  border,
}) => {
  const colorScheme = useColorScheme();
  return (
    <Link
      href={{ pathname: chat ? "/chat" : "/person", params: { user: name } }}
      asChild
    >
      <Pressable style={{ backgroundColor: colorScheme === "dark" ? Colors.dark.background: Colors.light.background }}>
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            margin: 3,
            borderColor: "lightgrey",
            borderWidth: border ? 0.5 : 0,
            borderRadius: 10,
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.background
                : Colors.light.background,
          }}
        >
          <Avatar.Image size={48} source={{ uri: avatar }} />
          <View style={{ flex: 1, margin: 5, marginLeft: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{name}</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>{username}</Text>
          </View>
          {connected ? (
            <Chip
              mode="outlined"
              style={{ margin: 10, backgroundColor: Colors.secondary.dark }}
              textStyle={{ fontSize: 12 }}
            >
              <Text style={{ color: "black" }}>Connected</Text>
            </Chip>
          ) : (
            <></>
          )}
          {poked ? (
            <Chip
              mode="outlined"
              style={{ margin: 10, backgroundColor: Colors.secondary.dark }}
              textStyle={{ fontSize: 12 }}
            >
              <Text style={{ color: "black" }}>Undo</Text>
            </Chip>
          ) : (
            <></>
          )}
          {viewed ? (
            <Text style={{ margin: 10, fontSize: 12, color: "grey" }}>
              Viewed 2 ago
            </Text>
          ) : (
            <></>
          )}
          {joined ? (
            <Chip
              mode="outlined"
              style={{ margin: 10, backgroundColor: Colors.secondary.dark }}
              textStyle={{ fontSize: 12 }}
            >
              <Text style={{ color: "grey" }}>Leave</Text>
            </Chip>
          ) : (
            <></>
          )}
          {date ? (
            <>
              <Chip
                mode="outlined"
                style={{ margin: 10, backgroundColor: Colors.secondary.dark }}
                textStyle={{ fontSize: 12 }}
              >
                <Text style={{ color: "grey" }}>Accept</Text>
              </Chip>
            </>
          ) : (
            <></>
          )}
          {arrow ? (
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
              style={{ margin: 10 }}
            />
          ) : (
            <></>
          )}
          {chat ? (
            <>
              <View
                style={{
                  width: 1,
                  height: 24,
                  backgroundColor: "grey",
                  margin: 10,
                }}
              />
              <Ionicons
                name="chatbox-outline"
                size={24}
                color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
                style={{ margin: 10 }}
              />
            </>
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    </Link>
  );
};

export default UserCard;
