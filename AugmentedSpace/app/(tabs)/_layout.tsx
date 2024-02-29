import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { resetRouterAndReRoute } from "../_layout";
import { DarkTheme } from "@/constants/ColorThemes";
import { View } from "react-native";

import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const settingsButton = () => {
  const { colors } = useTheme();
  return (
    <Link href="/setting" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="gear"
            size={25}
            color={colors.notification}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

// Created Custom tab element that wraps a tab icon to allow the active tab to have a top border
const CustomTabIcon = (icon: any, isActive: boolean, primaryColor: any) => {
  const iconStyle = {
    borderTopWidth: isActive ? 3 : 0, // Adjust the border thickness as needed
    borderColor: primaryColor,
  };

  return (
    <View
      className="py-2 px-4 flex justify-center align-middle text-center"
      style={iconStyle}
    >
      <TabBarIcon name={icon} color={primaryColor} />
    </View>
  );
};

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.notification,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarLabelStyle: { display: "none", color: colors.notification },
        headerTitleStyle: {
          color: DarkTheme.colors.text,
        },
        headerRight: settingsButton,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Catalog",
          tabBarIcon: ({ color, focused }) =>
            CustomTabIcon("home", focused, color),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) =>
            CustomTabIcon("heart", focused, color),
        }}
      />
      <Tabs.Screen
        name="ar_view"
        options={{
          title: "AR",
          tabBarIcon: ({ color, focused }) =>
            CustomTabIcon("camera", focused, color),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) =>
            CustomTabIcon("shopping-cart", focused, color),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            CustomTabIcon("user", focused, color),
        }}
      />
    </Tabs>
  );
}
