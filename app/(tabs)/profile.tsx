import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { Chip, Avatar, Button, Card, IconButton } from "react-native-paper";
import SettingsCard from "../../components/SettingsCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

import mockUsers from "../mock/MockData";

export default function ProfileScreen() {
  return (
    <>
      <Profile />
      <Connections />
      <View style={{ flexDirection: "row", gap: 8, padding: 20 }}>
        <Card
          style={{
            flex: 1,
            marginTop: -70,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: Colors.secondary.main,
          }}
        >
          <Card.Cover source={{ uri: "https://picsum.photos/300" }} />
        </Card>
        <Card
          style={{
            flex: 1,
            marginTop: -70,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: Colors.secondary.main,
          }}
        >
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        </Card>
        <Card
          style={{
            flex: 1,
            marginTop: -70,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: Colors.secondary.main,
          }}
        >
          <Card.Cover source={{ uri: "https://picsum.photos/400" }} />
        </Card>
      </View>

      <PersonalInfo />
    </>
  );
}

const User = mockUsers[0];

function Profile() {
  return (
    <View style={styles.profileContainer}>
      <View
        style={{
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
        }}
      >
        <Avatar.Image size={86} source={{ uri: User.avatar }} />
      </View>
      <View style={{ marginLeft: 10, backgroundColor: Colors.primary.main }}>
        <Text style={styles.title}>{User.name}</Text>
        <Text style={styles.subTitle}>@{User.username}</Text>
        <Chip
          icon="map-marker"
          style={{ marginTop: 10, backgroundColor: Colors.secondary.main }}
        >
          <Text style={{ color: Colors.primary.main }}>Online. 10 min</Text>
        </Chip>
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          right: 10,
          top: 70,
          backgroundColor: Colors.primary.main,
        }}
      >
        <IconButton
          icon="cog"
          size={24}
          style={{ marginRight: 5, backgroundColor: Colors.secondary.main }}
          mode="outlined"
          onPress={() => router.push("settings")}
        />
        <IconButton
          icon="bell"
          size={24}
          style={{ marginRight: 5, backgroundColor: Colors.secondary.main }}
          mode="outlined"
          iconColor={Colors.primary.main}
          borderless={true}
          onPress={() => router.push("notifs")}
        />
      </View>
    </View>
  );
}

function Connections() {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.primary.main,
        paddingHorizontal: 20,
        paddingBottom: 70,
      }}
    >
      <Chip
        mode="outlined"
        onPress={() => console.log("Pressed")}
        style={{
          marginRight: 5,
        }}
      >
        <Text style={{ color: Colors.primary.main }}>
          {User.connections} Connections
        </Text>
      </Chip>
      <Chip
        mode="outlined"
        icon=""
        onPress={() => console.log("Pressed")}
        style={{ marginLeft: 5, borderColor: Colors.primary.main }}
      >
        <Ionicons name="eye-outline" size={18} color={Colors.primary.main} />
        <View style={{ width: 5 }} />
        <Text style={{ color: Colors.primary.main }}>Profile Views</Text>
      </Chip>
      <Chip
        mode="outlined"
        onPress={() => console.log("Pressed")}
        style={{ marginLeft: 5, borderColor: Colors.primary.main }}
      >
        <Ionicons name="pencil-outline" size={18} color={Colors.primary.main} />
        <View style={{ width: 5 }} />
        <Text style={{ color: Colors.primary.main }}>Edit</Text>
      </Chip>
    </View>
  );
}

function PersonalInfo() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Ionicons
          name="school-outline"
          size={18}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.description}>University of Washington</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Ionicons
          name="briefcase-outline"
          size={18}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.description}>Facebook </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Bio</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>
          I am a project manager at Facebook. I love to snowboard and watch
          movies.{" "}
        </Text>
      </View>
      <Text style={styles.text}>Interests</Text>
      <View style={styles.separator} />
      <View style={{ flexDirection: "row" }}>
        <Chip icon="car" style={{ marginRight: 10 }}>
          cars
        </Chip>

        <Chip icon="movie" style={{ marginRight: 10 }}>
          Movies
        </Chip>
        <Chip icon="snowflake" style={{ marginRight: 10 }}>
          Snowboarding
        </Chip>
      </View>

      <Text style={styles.text}>Socials</Text>
      <View style={styles.separator} />
      <View style={{ flexDirection: "row" }}>
        <Chip icon="instagram" style={styles.chip} mode="outlined">
          Instagram
        </Chip>
        <Chip icon="linkedin" style={styles.chip} mode="outlined">
          LinkedIn
        </Chip>
        <Chip icon="facebook" style={styles.chip} mode="outlined">
          Facebook
        </Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.secondary.main,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "300",
    color: Colors.secondary.main,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    fontWeight: "300",
  },
  separator: {
    marginVertical: 5,
    width: "100%",
  },
  profileContainer: {
    flexDirection: "row",
    paddingTop: 80,
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    marginBottom: 20,
  },
  chip: {
    marginRight: 10,
  },
});
