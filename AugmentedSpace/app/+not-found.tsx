import { Link, Stack } from "expo-router";
import { Text, View } from "@/components/Themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold text-xl">This screen doesn't exist.</Text>

        <Link href="/" className="mt-3.5 px-3.5">
          <Text className="text-sm text-[#2e78b7]">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
