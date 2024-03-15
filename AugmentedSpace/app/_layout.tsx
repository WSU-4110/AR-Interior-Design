import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { LightTheme, DarkTheme } from "@/constants/ColorThemes";
import { FirebaseInstance } from "./services/firebase";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export const resetRouterAndReRoute = (route: any) => {
  while (router.canGoBack()) {
    router.back();
  }
  router.replace(route);
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
  const { currentUser } = FirebaseInstance.getAuth();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <Stack initialRouteName={currentUser ? "logIn" : "(tabs)"}>
        <Stack.Screen
          name="logIn"
          options={{
            headerTitle: "Log In",
            headerTitleStyle: {
              color: DarkTheme.colors.text,
            },
          }}
        />
        <Stack.Screen
          name="signUp"
          options={{
            headerTitle: "Sign Up",
            headerTitleStyle: {
              color: DarkTheme.colors.text,
            },
          }}
        />
        <Stack.Screen
          name="setting"
          options={{
            headerTitle: "App Settings",
            headerTitleStyle: {
              color: DarkTheme.colors.text,
            },
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
