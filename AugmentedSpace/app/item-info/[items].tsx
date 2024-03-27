import { infoPageStyle } from "@/styles/itemInfoPageStyles";
import { useLocalSearchParams } from "expo-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductScreen = () => {
  //get params from index.tsx
  const { items } = useLocalSearchParams();
  const { imageSource } = useLocalSearchParams();
  const { itemCost } = useLocalSearchParams();
  const { brandName } = useLocalSearchParams();

  const [imageUrl, setImageUrl] = useState("");

  //log params
  console.log("items: " + items);
  console.log("imageSource: " + imageSource);
  console.log("itemCost: " + itemCost);
  console.log("brandName: " + brandName);

  useEffect(() => {
    //retrieve image url from firebase
    const getImageUrl = async () => {
      const storage = getStorage();
      const reference = ref(storage, imageSource.toString());
      await getDownloadURL(reference).then((x) => {
        setImageUrl(x);
      })
    }

    getImageUrl();
  }, []);
  
  return (
    <ScrollView style={infoPageStyle.container}>
      {/* Product image */}
      <View style={infoPageStyle.imageContainer}>
        <Image
          source={{uri: imageUrl}}
          style={infoPageStyle.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={infoPageStyle.detailsContainer}>
        <Text style={infoPageStyle.productName}>{items}</Text>
        <Text style={infoPageStyle.productDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          dolorum quo. Nesciunt vero similique, soluta neque dolorum voluptas at
          sequi facilis fuga. Repellendus quas, dicta dignissimos sed delectus
          reprehenderit modi.
        </Text>
        <View style={infoPageStyle.priceRow}>
          <TouchableOpacity
            style={infoPageStyle.buyButton}
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Buy <Text style={infoPageStyle.priceText}>{itemCost}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style = {infoPageStyle.buyButton}
          onPress={() => Alert.alert("You have added this item to cart")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={infoPageStyle.viewInYourRoomButton}
          onPress={() => Alert.alert("View in Room button pressed")}
        >
          <Text style={infoPageStyle.buyButtonText}>View In Your Room</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
