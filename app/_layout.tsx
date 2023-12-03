import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { requestPermissions } from "../state/BLE/utils";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { auth } from "../firebase";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)/nerby",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    requestPermissions();
    const fetchUser = auth.onAuthStateChanged((userExist) => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser(null);
      }
    });
    return fetchUser;
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return  user ? <RootLayoutNav /> : <AuthLayoutNav />;
}

function AuthLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
 
  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          initialRouteName="(tabs)"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.secondary.main },
            headerShadowVisible: false,
            headerTintColor: "#000",
            headerTitleStyle: { fontWeight: "500", fontSize: 20 },
            contentStyle: { backgroundColor: Colors.secondary.main },
          }}>

          
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(settingsTabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search"
            options={{
              presentation: "modal",
              title: "Search",
              headerStyle: {
                backgroundColor:
                  colorScheme === "dark"
                    ? Colors.dark.background
                    : Colors.light.background,
              },
              headerTitleStyle: {
                fontWeight: "500",
                fontSize: 20,
                color:
                  colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
              },
              headerRight: () => (
                <Ionicons
                  name="filter"
                  size={24}
                  color={
                    colorScheme === "dark"
                      ? Colors.dark.text
                      : Colors.light.text
                  }
                  style={{ marginLeft: "auto", marginRight: 10 }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="person"
            options={{ title: "", headerShown: false }}
          />

          <Stack.Screen
            name="connections"
            options={{
              presentation: "modal",
              headerShown: false,
              contentStyle: {
                backgroundColor:
                  colorScheme === "dark"
                    ? Colors.dark.background
                    : Colors.light.background,
              },
            }}
          />

          <Stack.Screen name="map" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          </Stack>
      </ThemeProvider>
    </Provider>
  );
}

