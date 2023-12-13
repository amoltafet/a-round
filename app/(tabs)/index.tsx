import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  useColorScheme,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { View, Text } from "../../components/Themed";
import { Avatar, Badge, Button, Icon, IconButton, ToggleButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import mockUsers from "../mock/MockData";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SettingsCard from "../../components/SettingsCard";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { auth } from "../../firebase";
import { doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { SearchBar } from "react-native-screens";
import Colors from "../../constants/Colors";
import { nerbyUsers as newNerby, UsersNerby } from "../../state/UsersNerby";
import { getDatabase, ref } from "firebase/database";
import { GeoFire } from "geofire";
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment';
import { useSelector } from 'react-redux';

const AvatarSize = 48;
const { width, height } = Dimensions.get("window");

const App = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%", "35%"], []);
  const [modalUser, setModalUser] = useState(null);
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [location, setLocation] = useState(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
  const NUM_POINTS = 10;

  interface Point {
    innerX: number;
    innerY: number;
  }

  const handlePresentModalPress = useCallback((user) => {
    setModalUser(user);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
      />
    ),
    []
  );
  const db = getFirestore();
  const [nerbyUsers, setNerbyUsers] = useState([]);
  UsersNerby();

  useLayoutEffect(() => {
      const timer = setInterval(() => {
        setNerbyUsers(prevUsers => {
          if (JSON.stringify(newNerby) !== JSON.stringify(prevUsers)) {
            return newNerby;
          }
    
          // If they are the same, return the previous state without changes
          return prevUsers;
        });      
      }
      , 5000);

      return () => clearInterval(timer);
  } , [])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 10
  },
  statusPanel: {
    marginBottom: 10,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",

  },
  list: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 40,
    borderColor: "tomato",
    borderWidth: 10,
    zIndex: 1,
  },
  iconButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
  }
});

return (
  <BottomSheetModalProvider>
  <SafeAreaView style={styles.container}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" }}>
      
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", gap: 10,
      borderWidth: 1, borderRadius: 10, borderColor: "lightgrey", padding: 5, flex: 1, justifyContent: "space-between", marginVertical: 8
    }}>
        <Ionicons name="search" size={16} color="black" />
        <TextInput style={{ width: "100%", height: 20, backgroundColor: "transparent" }} 
          placeholder="Search for people nearby"
          placeholderTextColor="grey"
          
        />
      </View>
      <IconButton icon="shield" size={25}  style={styles.iconButton} 
        onPress={() => {
          router.push("map");
        }}  />
      <IconButton icon="map" size={25}  style={styles.iconButton}
        onPress={() => {
          router.push("map");
        }} />

      
    </View>
    <View style={styles.statusPanel}>
      <View  style={{ backgroundColor: "transparent"}}>
        <Text style={{ fontSize: 22, fontWeight: "500" }}>People Nerby</Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>Within 5 meters from you</Text>
      </View>
      <View style={{ backgroundColor: "transparent", marginRight: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "transparent", marginBottom: 5, gap: 7 }}>
           <Ionicons name="compass" size={32} color="black" />
        <View style={{ backgroundColor: "transparent"}}>
           <Text style={{ fontSize: 12, fontWeight: "400" }}>Status</Text>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Online</Text>
        </View>
      
        </View>  
       
      </View>
    
    </View>
      <SettingsCard
        title="Location Preferences"
        subTitle="Manage your location preferences"
        icon="location-outline"
        link="locationPreferences"
      />
    
    <CircleOfUsers nerbyUsers={nerbyUsers} handlePresentModalPress={handlePresentModalPress} />
    
    <ListOfUsers users={nerbyUsers} />

  </SafeAreaView>
  <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}       
    >
      <UserModal user={modalUser} />
    </BottomSheetModal>
  </BottomSheetModalProvider>
);
};

const UserModal = ({ user }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ padding: 10 }} key={user.id}>
      <Text style={{ fontSize: 22, fontWeight: "500" }}>Distance</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Animated.Image
          style={{ opacity, width: 64, height: 64, borderRadius: 32 }}
          source={{ uri: user.avatar }}
        />
        <Text style={{ fontSize: 32, fontWeight: "400" }}>{user.id}</Text>
      </View>
      <Text style={{ fontSize: 32, fontWeight: "400" }}>3 meters</Text>
    </View>
  );
}

const ListOfUsers = ({users}) => {
const colorScheme = useColorScheme();

function getTimeDifference(lastSeen) {
  const now = moment();
  const lastSeenMoment = moment(lastSeen, "MM/DD/YYYY, h:mm:ss A");
  return lastSeenMoment.fromNow();
}

return (
  <View style={{ padding: 5,  backgroundColor: "transparent" }}>
    <Text
      style={{
        fontSize: 22,
        fontWeight: "500",
      
      }}
    >
      Others Near You
    </Text>
    <Text style={{ fontSize: 12, fontWeight: "400", marginBottom: 10 }}>Within 10 meters from you</Text>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {users.map((user, index) => {
        return (
      
        <View style={{ marginRight: 10,  alignItems: "center", backgroundColor: "white",
        borderWidth: 1, borderRadius: 10, borderColor: "lightgrey", padding: 10, flex: 1, justifyContent: "space-between", marginTop: 8
        }} key={index}>
         
          {
          user.avatar !== "" ?

            <Avatar.Image size={48} source={{ uri: user.avatar }} />
            :
            <Avatar.Text size={32} label={user.username[0]} />
          }
       
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              paddingTop: 5,
              fontWeight: "600",
              color: "black",
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 10,
              paddingTop: 5,
              fontWeight: "600",
              color: "black",
            }}
          >
            @{user.username}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              paddingTop: 3,
              fontWeight: "600",
              color: "grey",
            }}
          >
        {user.lastSeen ? getTimeDifference(user.lastSeen) : "now"}
          </Text>
        </View>
        );
      })}
    </ScrollView>
  </View>
);
};

function createPoints(): Point[] {
  const points = [];
  const numberOfAvatars = 10;
  const radius = Math.min(width, height) / 3.5; // adjust as needed
  const centerX = 0 ; // adjust as needed
  const centerY = 0; // adjust as needed

  for (let i = 0; i < numberOfAvatars; i++) {
    const angle = (i / numberOfAvatars) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle) - AvatarSize / 2;
    const y = centerY + radius * Math.sin(angle) - AvatarSize / 2;

    points.push({ innerX: x, innerY: y });
  }

  return points;
}  

const CircleOfUsers = ({nerbyUsers, handlePresentModalPress}) => {
  const points = createPoints();
  
  const ShimmerEffect = ({ width, height }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, []);
  
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, width],
    });
  
    return (
      <LinearGradient
        colors={['#f3f3f3', '#e0e0e0', '#f3f3f3']}
        style={{ width, height, borderRadius: height / 2 }}
      >
        <Animated.View
          style={{
            width,
            height,
            backgroundColor: 'white',
            position: 'absolute',
            transform: [{ translateX }],
          }}
        />
      </LinearGradient>
    );
  };
  return (
    <View style={{ 
      position: "relative",
      width: "100%",
      height: "45%", 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
 }}>

  <IconButton
      style={{ position: "absolute", top: 10, right: 10 }}
      icon="refresh-circle"
      size={20}
      onPress={ () => {
        
      }}
      />             
      <Ionicons name="compass" size={32} color="black" 
        style={{ position: "absolute", //center
        top: "50%",
        left: "50%",
        marginLeft: -16,
        marginTop: -16,
        }}
      />  

    {points.map((point, idx) => {
  const user = nerbyUsers[idx];

  return (
    <Pressable 
    onPress={ e => 
      user ?
      handlePresentModalPress(user) : null 
     } key={idx}
    >
      <View
        style={{
          position: "absolute",
          top: point.innerY,
          left: point.innerX,
          borderWidth: 2,
          borderRadius: 40,
          borderColor: "white",
          elevation: 10,
          shadowColor: "black",
          shadowOpacity: 0.8,
        }}
      >
        { user && user.avatar ?
        <Avatar.Image
          size={AvatarSize}
          source={{ uri: user.avatar }}
        />
        :
        <ShimmerEffect width={AvatarSize} height={AvatarSize} />
      }
      
      </View>
    </Pressable>
  );
    })}
  </View>

    ) 
  }

export default App;
