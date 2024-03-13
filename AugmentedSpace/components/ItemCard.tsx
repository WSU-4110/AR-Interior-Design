import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

type ItemCardProps = {
  itemName: string;
  brandName: string;
  itemCost: number;
  className?: string;
  onPress?: () => void;
};

export default function ItemCard(props: ItemCardProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      className="w-1/2 h-auto flex-1 mx-1 p-2 rounded-2xl"
      onPress={props.onPress}
      style={{
        backgroundColor: colors.card,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: colors.shadow,
        shadowOpacity: 1,
      }}
    >
      <Image
        className="self-center h-32 w-32 my-2"
        source={require("@/assets/images/favicon.png")}
      />
      <View
        className="m-1">
        <Text className="text-xl" style={{ color: colors.text }}>
          {props.itemName}
        </Text>
        <Text className="italic font-semibold" style={{ color: colors.text }}>
          {props.brandName}
        </Text>
        <Text className="font-semibold" style={{ color: colors.text }}>
          {props.itemCost}
        </Text>
      </View>
    </Pressable>
  );
}
