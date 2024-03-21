import { Stack } from "expo-router";
import { Text, View } from "@/components/Themed";
import { resetRouterAndReRoute } from "./_layout";
import { Pressable } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold text-xl">This screen doesn't exist.</Text>

        <Pressable
          className="mt-3.5 px-3.5"
          onPress={() => resetRouterAndReRoute("logIn")}
        >
          <Text className="text-sm text-[#2e78b7]">Go to home screen!</Text>
        </Pressable>
      </View>
    </>
  );
}
