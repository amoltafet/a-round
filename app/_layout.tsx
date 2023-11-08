import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.secondary.main,
          },
          headerShadowVisible: false,
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 20,
          },
          contentStyle: {
            backgroundColor: Colors.secondary.main,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(settingsTabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="search"
          options={{
            presentation: "modal",
            headerSearchBarOptions: {},
            title: "Search People Around You",
          }}
        />
        <Stack.Screen
          name="person"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings & Privacy",
          }}
        />
        <Stack.Screen
          name="notifs"
          options={{
            title: "Notifications",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
