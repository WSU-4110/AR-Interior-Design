import { Text, View } from "@/components/Themed";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">Index Page</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Expected to see catelog/main page here.</Text>
    </View>
  );
}
