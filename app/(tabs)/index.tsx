import { Pressable, StyleSheet } from "react-native";
import * as React from "react";
import { useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import PeopleCard from "../../components/PeopleCard";
import { Avatar, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Alert, Modal } from "react-native";

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);


  const LocationModal = () => {
    const styles = StyleSheet.create({
        modalContainer: {
            maxHeight: 500,
            position: 'relative',
            marginTop: 700,
            marginBottom: 85,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "transparent"
        },
        modalView: {
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
              },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2,
        },
        buttonOpen: {
          backgroundColor: '#F194FF',
        },
        buttonClose: {
          backgroundColor: '#2196F3',
        },
        textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        modalText: {
          marginBottom: 15,
          textAlign: 'center',
        },
    });

    return (
      <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>

          </View>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            borderColor: Colors.orange,
            backgroundColor: Colors.orange,
            borderWidth: 2,
            borderRadius: 10,
            minHeight: 80,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", backgroundColor: Colors.orange }}
          >
            <Avatar.Text
              size={48}
              label="46"
              style={{
                backgroundColor: Colors.white,
              }}
            />
            <Text style={styles.title}>People Around You</Text>
          </View>
          <View style={styles.statusBar}>
            <Chip
              icon=""
              style={{ marginRight: 10, backgroundColor: Colors.blue }}
            >
              <Text style={{ color: Colors.white }}>You are visible</Text>
            </Chip>
            <Chip
              icon="eye-off-outline"
              style={{ marginRight: 10, backgroundColor: Colors.green }}
              mode="flat"
            >
              Private Mode
            </Chip>
          </View>
        </View>

        <FlatList
          numColumns={2}
          key={"_"}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          shouldCancelWhenOutside={true}
          data={[
            { key: "Devin Jkae" },
            { key: "Dan" },
            { key: "Dominic" },
            { key: "Jackson" },
            { key: "James" },
            { key: "Joel" },
            { key: "John" },
            { key: "Jillian" },
            { key: "Jimmy" },
            { key: "Julie" },
          ]}
          renderItem={({ item }) => (
            <PeopleCard
              name={item.key}
              bio="I am a software engineer"
              job="Software Engineer"
            />
          )}
        />
      </View>
      <View style={styles.filterButton}>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
          <Ionicons name="location-outline" size={36} color={Colors.white} />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <LocationModal />
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  statusBar: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 10,
    backgroundColor: Colors.orange,
  },
  filterButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 10,
  },
});
