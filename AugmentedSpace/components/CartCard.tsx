import { Image, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { View, Text } from "@/components/Themed";

type CartCardProps = {
  itemName: string;
  brandName: string;
  itemCost: number;
  imagePath: string;
  onRemove: () => void;
  width: number;  // Add width prop
};

export default function CartCard(props: CartCardProps) {
  const { colors } = useTheme();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImageUrl = async () => {
      const storage = getStorage();
      const reference = ref(storage, props.imagePath);
      await getDownloadURL(reference).then(setImageUrl);
    };
    getImageUrl();
  }, [props.imagePath]);

  return (
    <Pressable
      style={{
        backgroundColor: colors.card,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: props.width,  // Set dynamic width based on screen size
      }}
      onPress={() => console.log("Item pressed")}
    >
      <Image
        style={{ height: 100, width: 100, alignSelf: "center" }}
        source={{ uri: imageUrl }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: colors.text, fontSize: 16 }}>{props.brandName}</Text>
        <Text style={{ color: colors.text, fontSize: 16 }}>{props.itemName}</Text>
        <Text style={{ color: colors.text, fontSize: 16 }}>${props.itemCost}</Text>
      </View>
      <Pressable onPress={props.onRemove} style={{ padding: 10, alignItems: 'center' }}>
        <Text style={{ color: colors.text, fontWeight: 'bold' }}>Remove</Text>
      </Pressable>
    </Pressable>
  );
}
