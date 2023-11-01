import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { Chip, Avatar, Button, Card } from "react-native-paper";
import SettingsCard from "../../components/SettingsCard";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Profile />
      <Connections />
      <Photos />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <PersonalInfo />
      <SettingsCard
        title="Complete Privacy"
        subTitle="Control your profile visibility"
        icon="eye-outline"
      />
    </View>
  );
}

function Profile() {
  return (
    <View style={styles.profileContainer}>
      <Avatar.Text size={48} label="XD" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>Xervior Dormand</Text>
        <Text style={styles.subTitle}>Project Manager at Facebook</Text>
      </View>
    </View>
  );
}

function Connections() {
  return (
    <View style={styles.profileContainer}>
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        10 Profile Views
      </Button>
      <Button
        mode="outlined"
        onPress={() => console.log("Pressed")}
        style={{ marginLeft: 10 }}
      >
        532 Connections
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
        <Text style={styles.subTitle}>
          I am a project manager at Facebook. I love to snowboard and watch
          movies.{" "}
        </Text>
      </View>
      <Text style={styles.title}>Interests</Text>
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
      <View style={styles.profileContainer}>
        <Chip icon="instagram" style={{ marginRight: 10 }} mode="outlined">
          Instagram
        </Chip>
        <Chip icon="linkedin" style={{ marginRight: 10 }} mode="outlined">
          LinkedIn
        </Chip>
        <Chip icon="facebook" style={{ marginRight: 10 }} mode="outlined">
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "300",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
  profileContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
});
