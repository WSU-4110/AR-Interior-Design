import { Text, View } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";

export default function AR_View() {
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="font-bold text-xl">This is the AR View Page</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
