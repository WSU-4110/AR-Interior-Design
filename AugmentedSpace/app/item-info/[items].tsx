import { infoPageStyle } from "@/styles/itemInfoPageStyles";
import { useLocalSearchParams } from "expo-router";
<<<<<<< HEAD
import React, { useState, useCallback } from "react";
import { Rating } from '@kolking/react-native-rating';
=======
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
>>>>>>> main
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const ProductScreen = () => {
  const { items } = useLocalSearchParams();
  const { price } = useLocalSearchParams();
  const [rating, setRating] = useState(0);

  const handleChange = useCallback(
    (value:number) => setRating(Math.round((rating + value) * 5) / 10), [rating],);
  
  return (
    <ScrollView style={infoPageStyle.container}>
      {/* Product image */}
      <View style={infoPageStyle.imageContainer}>
        <Image
          source={require("@/assets/images/favicon.png")}
          style={infoPageStyle.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={infoPageStyle.detailsContainer}>
        <Text style={infoPageStyle.productName}>Product name {items}</Text>
        <Text style={infoPageStyle.productDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          dolorum quo. Nesciunt vero similique, soluta neque dolorum voluptas at
          sequi facilis fuga. Repellendus quas, dicta dignissimos sed delectus
          reprehenderit modi.
        </Text>
        <View style={infoPageStyle.priceRow}>
          <TouchableOpacity
            style={infoPageStyle.buyButton}
<<<<<<< HEAD
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Buy <Text style={infoPageStyle.priceText}>{price}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style = {infoPageStyle.buyButton}
          onPress={() => Alert.alert("You have added this item to cart")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Add to cart
=======
            className="flex-1 items-center"
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Buy <Text style={infoPageStyle.priceText}>${itemCost}</Text>
>>>>>>> main
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={infoPageStyle.viewInYourRoomButton}
<<<<<<< HEAD
=======
          className="flex-1 items-center"
>>>>>>> main
          onPress={() => Alert.alert("View in Room button pressed")}
        >
          <Text style={infoPageStyle.buyButtonText}>View In Your Room</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
