import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { resetRouterAndReRoute } from "../_layout";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const settingsButton = () => {
  const colorScheme = useColorScheme();

  return (
    <Link href="/setting" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="gear"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Catalog",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: settingsButton,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerRight: settingsButton,
        }}
      />
      <Tabs.Screen
        name="ar_view"
        options={{
          title: "AR View",
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          headerRight: settingsButton,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
          headerRight: settingsButton,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: settingsButton,
        }}
      />
    </Tabs>
  );
}
