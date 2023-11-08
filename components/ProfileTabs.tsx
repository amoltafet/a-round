import React from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Card, Chip, IconButton } from "react-native-paper";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileTabs() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const FirstRoute = () => (
      <View style={{ flexDirection: "row", gap: 8, paddingTop: 10 }}>
        <Card
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: Colors.secondary.main,
          }}
        >
          <Card.Cover source={{ uri: "https://picsum.photos/300" }} />
        </Card>
        <Card
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: Colors.secondary.main,
          }}
        >
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        </Card>
        <Card
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: Colors.secondary.main,
          }}
        >
          <Card.Cover source={{ uri: "https://picsum.photos/400" }} />
        </Card>
      </View>
  );

  const SecondRoute = () => (
    <View>
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

  const ThirdRoute = () => (
    <View>
      <Text> Third </Text>
    </View>
  );

  const renderSection = () => {
    if (activeIndex === 0) {
      return <FirstRoute />;
    }
    if (activeIndex === 1) {
      return <SecondRoute />;
    }
    else {
        return <ThirdRoute />;
        }
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30 }}>
        <IconButton
          icon="picture-in-picture-bottom-right"
          size={30}
          onPress={() => {
            setActiveIndex(0);
          }}
          iconColor={activeIndex === 0 ? Colors.primary.dark : "#ccc"}
        />
        <IconButton
          icon="format-list-bulleted"
          size={30}
          onPress={() => {
            setActiveIndex(1);
          }}
          iconColor={activeIndex === 1 ? Colors.primary.dark : "#ccc"}
        />
        <IconButton
          icon="account"
          size={30}
          onPress={() => {
            setActiveIndex(2);
          }}
          iconColor={activeIndex === 2 ? Colors.primary.dark : "#ccc"}
        />
      </View>
      <View style={styles.separator} />

      {renderSection()}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    height: 1,
    width: "100%",
  },
    card: {
        borderWidth: 1,
        borderColor: Colors.secondary.main,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    description: {
        fontSize: 15,
        fontWeight: "300",
    },
    chip: {
        marginRight: 10,
    },
    
});
