import { Link, Tabs, Navigator, useNavigation, router } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { Avatar, Badge, IconButton } from "react-native-paper";
import { View, Text } from "../../components/Themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={32} style={{ marginBottom: 0 }} {...props} />;
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
          
          borderRadius: 10,
          height: 80,
          paddingBottom: 5,
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
          tabBarStyle: {
            
            borderColor: Colors.primary.main,
            borderWidth: 0,
            height: 80,
            
            
            paddingBottom: 5,
            
          },
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
            <Pressable
              onPress={() => router.push("search")}
              style={{ marginRight: 20 }}
            >
              <TabBarIcon name="chatbox-ellipses" color={Colors.primary.main} />
            </Pressable>
          ),
          headerLeft: () => (
            <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "500" }}>
              Your Inbox
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                marginBottom: -3,
                borderWidth: 3,
                borderColor: color,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                elevation: 1,
                borderRadius: 50,
              }}
            >
              <Avatar.Image
                size={28}
                source={{
                  uri: "https://randomuser.me/api/portraits/men/1.jpg",
                }}
              />
            </View>
          ),
          headerLeft: () => (
            <IconButton
              icon="cog-outline"
              size={28}
              style={{ marginLeft: 20 }}
              onPress={() => router.push("settings")}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="bell-outline"
              size={28}
              style={{ marginRight: 20 }}
              onPress={() => router.push("notifs")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
