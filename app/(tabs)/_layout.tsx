import { Link, Tabs, Navigator, useNavigation, router } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { Avatar } from "react-native-paper";
import { View } from "../../components/Themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors.secondary.main,
          borderWidth: 1,
          borderColor: "lightgrey",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          elevation: 1,
          borderRadius: 50,
          height: 60,
          marginBottom: 20,
          paddingBottom: 10,
          paddingTop: 10,
          marginHorizontal: 40,
          alignContent: "center",
          justifyContent: "center",
          
        },
        headerTitleStyle: {
          fontWeight: "500",
          fontSize: 20,
        },
        headerShadowVisible: false,
       
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="at-circle" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbox-ellipses-outline" color={color} />
          ),
          headerRight: () => (
            <Pressable onPress={() => router.push("search")} style={{marginRight: 20}}>
            <TabBarIcon name="chatbox-ellipses" color={Colors.primary.main}  />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => 
          <View style={{marginBottom: -3,
            borderWidth: 2,
            borderColor: color,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            elevation: 1,
            borderRadius: 50,
          }} >
          <Avatar.Image  size={28} source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} 
    
          /></View>,
          headerLeft: () => (
            <Pressable onPress={() => router.push("settings")} style={{marginLeft: 20}}>
            <TabBarIcon name="settings-outline" color={Colors.primary.dark}  />
            </Pressable>
          ),
          headerRight: () => (
            // notifs
            <Pressable onPress={() => router.push("notifs")} style={{marginRight: 20}}>
            <TabBarIcon name="notifications-outline" color={Colors.primary.dark}  />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
