import React from "react";
import {  View, StyleSheet } from "react-native";
import { Card,IconButton, Chip } from "react-native-paper";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserCard from "./UserCard";
import SettingsCard from "./SettingsCard";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { useColorScheme } from "react-native";
import { Text } from "./Themed";
export default function ProfileTabs() {
  const colorScheme = useColorScheme();
  const SpotifyCarousel = () => (
    <View>
    <ScrollView style={{  gap: 8, paddingTop: 10, paddingBottom: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ alignItems: "center", marginRight: 10 }}>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" }} style={{ width: 150, height: 150, borderRadius: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "start", marginTop: 5 }}>
        <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" }} />
        <Text style={{ fontSize: 16, fontWeight: "400",  marginLeft: 5 }}>The Weeknd</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginRight: 10 }}>
        <Image source={{ uri: "https://i.scdn.co/image/ab67616d00001e02c9a1ac950b093bcc0066e450" }} style={{ width: 150, height: 150, borderRadius: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "start", marginTop: 5 }}>
        <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" }} />
        <Text style={{ fontSize: 16, fontWeight: "400",  marginLeft: 5 }}>My love play</Text>
         </View>
        </View>
      <View style={{ alignItems: "center", marginRight: 10 }}>
        <Image source={{ uri: "https://www.befunky.com/images/wp/wp-2020-12-final-cover-1.jpg?auto=avif,webp&format=jpg&width=944" }} style={{ width: 150, height: 150, borderRadius: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "start", marginTop: 5 }}>
        <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" }} />
        <Text style={{ fontSize: 16, fontWeight: "400",  marginLeft: 5 }}>Rainy Day</Text>
        </View>     
         </View>
         <View style={{ alignItems: "center", marginRight: 10 }}>
        <Image source={{ uri: "https://media.timeout.com/images/103279758/750/562/image.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "start", marginTop: 5 }}>
        <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" }} />
        <Text style={{ fontSize: 16, fontWeight: "400",  marginLeft: 5,}}>Views: Drake</Text>
        </View>     
         </View>
         <View style={{ alignItems: "center", marginRight: 10 }}>
        <Image source={{ uri: "https://media.pitchfork.com/photos/647e290ae7a8aa8db8026970/master/pass/Taylor-Swift.jpg" }} style={{ width: 150, height: 150, borderRadius: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "start", marginTop: 5 }}>
        <Avatar.Image size={18} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" }} />
        <Text style={{ fontSize: 16, fontWeight: "400",  marginLeft: 5 }}>Speak Now: Swift</Text>
        </View>     
         </View>
  
    </ScrollView>
    </View>
  );

  const SecondRoute = () => (
    <View >
      <View 
      style={{
        marginBottom: 5, marginTop: 5, gap: 10, borderWidth: 0.5, borderColor: colorScheme === 'dark' ? Colors.dark.background : "grey",
        
        borderRadius: 10, padding: 10
      }}>
      <ScrollView 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{padding: 5 }}>
        <Chip icon="cake" style={{marginRight: 10}}>
          21
        </Chip>
        <Chip icon="account" style={{marginRight: 10}}>
          Man
        </Chip>
        <Chip icon="ruler" style={{marginRight: 10}}>
          5' 7
        </Chip>
        <Chip icon="invert-colors" style={{marginRight: 10}}>
          White
        </Chip>
        <Chip icon="zodiac-gemini" style={{marginRight: 10}}>
        Gemini
        </Chip>
      </ScrollView>
    
        <Chip icon="briefcase" 
          textStyle={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,}}
        style={{borderWidth: 0,
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        }}  mode="outlined">
          Software Engineer at Expedia Group
        </Chip>
        <Chip icon="school" 
                  textStyle={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,}}

        style={{ borderWidth: 0,
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        }} mode="outlined">
          Student at Gonzaga Univeristy
        </Chip>
        <Chip 
                  textStyle={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,}}

        icon="cake" style={{ borderWidth: 0,
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        }} mode="outlined">
          Excited to meet new people and make new friends! 
        </Chip>
      </View>
    </View>
  );

  const ThirdRoute = () => (
    <View>
      <Text style={styles.text}>Groups Joined</Text>
      <SettingsCard
        title="Gonzaga University Students"
        subTitle="Maria: Hi everyone! I'm a freshman at Gonzaga and I'm looking to meet new people!"
        avatar
        border
      />
      <SettingsCard
        title="Engineering 231"
        subTitle="Shafiq: Can someone help me with week 3's homework?"
        avatar
        border
      />
      <SettingsCard
        title="Expedia Group"
        subTitle="Tomato Street at 6:00 PM tonight!"
        avatar
        border
      />
      <SettingsCard
        title="Join Other Groups"
        subTitle="See all groups you can join"
        icon="people"
        border
      />
    </View>
  );

 

  return (
    <View >
     <SecondRoute />
      <SpotifyCarousel />
     <ThirdRoute />

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
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
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
