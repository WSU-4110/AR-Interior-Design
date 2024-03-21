import { infoPageStyle } from "@/styles/itemInfoPageStyles";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useCallback } from "react";
import { Rating } from '@kolking/react-native-rating';
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
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Buy <Text style={infoPageStyle.priceText}>{price}</Text>
            </Text>
          </TouchableOpacity>
          <View style={infoPageStyle.root}>
            <Rating size={27} rating={rating} onChange={handleChange} baseColor="grey" fillColor="red"/>
          </View>
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
