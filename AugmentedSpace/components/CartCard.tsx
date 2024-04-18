import { Image, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { View, Text } from "@/components/Themed";
import { router } from "expo-router";

type CartCardProps = {
  
  itemName: string;
  brandName: string;
  itemCost: number;
  imagePath: string;
  onRemove: () => void;
  width: number;
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
      style={[styles.card, { backgroundColor: colors.card, width: props.width }]}
      onPress={() => router.push({
        pathname: "/item-info/[items]" ,
        params: {
          items: props.itemName,
          imageSource: props.imagePath,
          itemCost: props.itemCost,
          brandName: props.brandName
        },
      })}
    >
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.text, { color: colors.text }]}>{props.brandName}</Text>
        <Text style={[styles.text, { color: colors.text, fontSize: 16 }]}>{props.itemName}</Text>
        <Text style={[styles.text, { color: colors.text, fontSize: 16 }]}>${props.itemCost}</Text>
      </View>
      <Pressable onPress={props.onRemove} style={styles.removeButton}>
        <Text style={[styles.removeText, { color: colors.text }]}>Remove</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: "center"
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontWeight: 'bold'
  },
  removeButton: {
    padding: 10,
    alignItems: 'center'
  },
  removeText: {
    fontWeight: 'bold'
  }
});
