import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";


type ItemCardProps = {
  itemName: string;
  brandName: string;
  itemCost: number;
  imagePath: string;
  className?: string;
  onPress?: () => void;
};

export default function ItemCard(props: ItemCardProps) {
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
        source={{uri: imageUrl}}
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
