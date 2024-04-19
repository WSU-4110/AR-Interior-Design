import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
type CartCardProps = {
  itemName: string;
  brandName: string;
  itemCost: number;
  imagePath: string;
  className?: string;
  onPress?: () => void;
  onRemove: () => void;
};

export default function CardCard(props: CartCardProps) {
  const { colors } = useTheme();
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = getAuth();

  useEffect(() => {
    //retrieve image url from firebase
    const getImageUrl = async () => {
      const storage = getStorage();
      const reference = ref(storage, props.imagePath);
      await getDownloadURL(reference).then((x) => {
        setImageUrl(x);
      })
    }

    getImageUrl();
  }, []);

  return (
    <Pressable
      testID="cart-card-pressable"
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
        testID="cart-card-image"
        className="self-center h-32 w-32 my-2"
        source={{uri: imageUrl}}
      />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 80,
      }}
        className="m-1">
        <Text className="italic font-semibold" style={{ color: colors.text }}>
          {props.brandName}
        </Text>
        <Text className="italic text-xl" style={{ color: colors.text }}>
          {props.itemName}
        </Text>
        
        <Text className="font-semibold" style={{ color: colors.text }}>
          ${props.itemCost}
        </Text>
        
      </View>
      <Pressable onPress={props.onRemove} style = {{
            padding: 10,
            alignItems: 'center',
            borderTopWidth: 3,
            borderColor: colors.border,
        }}>
            <Text style={{color: colors.text, fontWeight: 'bold',}}>Remove</Text>
        </Pressable>
    </Pressable>
  );
}
