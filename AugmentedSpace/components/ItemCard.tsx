import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import FavButton from "@/components/favButton";

type ItemCardProps = {
  UUID: string;
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
      });
    };

    getImageUrl();
  }, []);

  return (
    <View className="flex-1">
      <View
        className="w-auto h-auto flex-1 mx-3 mt-3 rounded-t-2xl align-top"
        style={{
          backgroundColor: colors.card,
          shadowOffset: { width: 2, height: 2 },
          shadowColor: colors.shadow,
          shadowOpacity: 1,
        }}
      >
        <Pressable onPress={props.onPress}>
          <View>
            <Image
              className="self-center h-32 w-32 my-2"
              source={{ uri: imageUrl }}
            />
          </View>
          <View className="m-1">
            <Text className="text-xl" style={{ color: colors.text }}>
              {props.itemName}
            </Text>
            <Text
              className="italic font-semibold"
              style={{ color: colors.text }}
            >
              {props.brandName}
            </Text>
            <Text className="font-semibold" style={{ color: colors.text }}>
              {props.itemCost}
            </Text>
          </View>
        </Pressable>

        {/* Quick Action Buttons */}
        <View className="flex w-full flex-row">
          <Pressable className="bg-red-500 flex-grow">
            <Text style={{ color: colors.text }}>AR</Text>
          </Pressable>
          <Pressable className="bg-blue-500 flex-grow">
            <Text style={{ color: colors.text }}>CART</Text>
          </Pressable>
        </View>
      </View>

      {/* Favorite */}
      <View className="absolute grid self-end w-10 h-10">
        <FavButton itemUUID={props.UUID} />
      </View>
    </View>
  );
}
