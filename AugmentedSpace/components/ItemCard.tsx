import { Image, Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

type ItemCardProps = {
  itemName: string;
  brandName: string;
  itemCost: number;
  onPress?: () => void;
};

export default function ItemCard(props: ItemCardProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      className="h-full w-1/2 grow mx-1 p-2"
      onPress={props.onPress}
      style={{
        backgroundColor: colors.card,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 1,
      }}
    >
      <Image
        className="self-center"
        source={require("@/assets/images/favicon.png")}
      />
      <Text className="text-xl" style={{ color: colors.text }}>
        {props.itemName}
      </Text>
      <Text className="italic font-semibold" style={{ color: colors.text }}>
        {props.brandName}
      </Text>
      <Text className="font-semibold" style={{ color: colors.text }}>
        {props.itemCost}
      </Text>
    </Pressable>
  );
}
