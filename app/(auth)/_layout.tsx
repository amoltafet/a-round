import {
    Link,
    Tabs,
    Navigator,
    useNavigation,
    Stack,
    router,
  } from "expo-router";
  import { Pressable, useColorScheme, Button } from "react-native";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import Colors from "../../constants/Colors";
  
  /**
   * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
   */
  
  export default function TabLayout() {
    const colorScheme = useColorScheme();
  
    return (
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            title: "Edit Profile",
            headerLeft: () => (
              <Button
                onPress={() => {
                  router.back();
                }}
                title="Back"
              />
            ),
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            title: "Security",
            headerLeft: () => (
              <Button
                onPress={() => {
                  router.back();
                }}
                title="Back"
              />
            ),
          }}
        />
    
      </Stack>
    );
  }
  