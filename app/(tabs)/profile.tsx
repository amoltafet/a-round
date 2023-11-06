import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { Chip, Avatar, Button, Card } from "react-native-paper";
import SettingsCard from "../../components/SettingsCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Colors from "../../constants/Colors";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Profile />
      <Connections />
      <Photos />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <PersonalInfo />
    </SafeAreaView>
  );
}

function Profile() {
  return (
    <View style={styles.profileContainer}>
      <Avatar.Text size={48} label="XD" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>Xervior Dormand</Text>
        <Text style={styles.subTitle}>@2ervior</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 60 }}>
        <Pressable
          onPress={() => router.push("settings")}
          style={{
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 50,
            padding: 10,
            marginRight: 10,
            backgroundColor: Colors.primary.main,
          }}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={Colors.secondary.main}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push("notifs")}
          style={{
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 50,
            padding: 10,
            marginRight: 10,
            backgroundColor: Colors.primary.main,
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.secondary.main}
          />
        </Pressable>
      </View>
    </View>
  );
}

function Connections() {
  return (
    <View style={styles.profileContainer}>
      <Button
        mode="contained"
        onPress={() => console.log("Pressed")}
        style={{
          backgroundColor: Colors.primary.main,
          marginRight: 5,
        }}
      >
        10 Profile Views
      </Button>
      <Button
        mode="outlined"
        onPress={() => console.log("Pressed")}
        style={{ marginLeft: 5, borderColor: Colors.primary.main }}
      >
        <Text>532 Connections</Text>
      </Button>
    </View>
  );
}

function Photos() {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Card style={{ flex: 1 }}>
        <Card.Cover source={{ uri: "https://picsum.photos/300" }} />
      </Card>
      <Card style={{ flex: 1 }}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      </Card>
      <Card style={{ flex: 1 }}>
        <Card.Cover source={{ uri: "https://picsum.photos/400" }} />
      </Card>
    </View>
  );
}

function PersonalInfo() {
  return (
    <View>
      <View style={styles.separator} />
      <View style={styles.profileContainer}>
        <Ionicons
          name="school-outline"
          size={18}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.subTitle}>University of Washington</Text>
      </View>
      <View style={styles.profileContainer}>
        <Ionicons
          name="briefcase-outline"
          size={18}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.subTitle}>Facebook </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Bio</Text>
        <View style={styles.separator} />
        <Text style={styles.subTitle}>
          I am a project manager at Facebook. I love to snowboard and watch
          movies.{" "}
        </Text>
      </View>
      <Text style={styles.title}>Interests</Text>
      <View style={styles.separator} />
      <View style={styles.profileContainer}>
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

      <Text style={styles.title}>Socials</Text>
      <View style={styles.separator} />
      <View style={styles.profileContainer}>
        <Chip icon="instagram" style={styles.chip} mode="outlined">
          Instagram
        </Chip>
        <Chip icon="linkedin" style={styles.chip} mode="outlined">
          LinkedIn
        </Chip>
        <Chip icon="facebook" style={styles.chip} mode="outlined" >
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
    paddingVertical: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primary.main,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "300",
    color: Colors.primary.main,
  },
  separator: {
    marginVertical: 5,
    width: "100%",
  },
  profileContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  chip : {
    marginRight: 10,
  }
});
