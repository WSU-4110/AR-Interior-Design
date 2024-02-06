import { Text, View } from "@/components/Themed";

export default function Cart() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">This Is Your Cart</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
