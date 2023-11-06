import { Link, Tabs, Navigator, useNavigation } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

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
          backgroundColor: Colors.white,
          borderWidth: 1,
          borderColor: "lightgrey",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          elevation: 1,
          borderRadius: 50,
          height: 60,
          marginBottom: 15,
          paddingBottom: 10,
          paddingTop: 10,
          marginHorizontal: 30,
        },

      }}
      
    >
      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbox-ellipses-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "A-Round",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="at-circle" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
