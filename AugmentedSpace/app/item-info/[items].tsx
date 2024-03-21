import { infoPageStyle } from "@/styles/itemInfoPageStyles";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating";
const ProductScreen = () => {
  const { items } = useLocalSearchParams();
  const [starCount, setStarCount] = useState(0);

  const onStarRatingPress = (rating: number) => {
    setStarCount(rating);
    Alert.alert("Rating", `You have given a rating of ${rating} stars.`);
  };
  return (
    <ScrollView style={infoPageStyle.container}
      className="flex-1" >

      {/* Product image */}
      <View style={infoPageStyle.imageContainer}>
        <Image
          source={require("@/assets/images/favicon.png")}
          style={infoPageStyle.productImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={infoPageStyle.view360Button}>
          <Text>360°</Text>
        </TouchableOpacity>
      </View>
      <View style={infoPageStyle.detailsContainer}>
        <View style={infoPageStyle.starRating}>
          <Text style={infoPageStyle.productName}>Product name {items}</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={(rating: number) => onStarRatingPress(rating)}
            fullStarColor={"gold"}
            emptyStarColor={"grey"}
          />
        </View>
        <Text style={infoPageStyle.productDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          dolorum quo. Nesciunt vero similique, soluta neque dolorum voluptas at
          sequi facilis fuga. Repellendus quas, dicta dignissimos sed delectus
          reprehenderit modi.
        </Text>
        <View style={infoPageStyle.priceRow}>
          <TouchableOpacity
            style={infoPageStyle.buyButton}
            className="flex-1 items-center"
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Buy <Text style={infoPageStyle.priceText}>$99.99</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={infoPageStyle.viewInYourRoomButton}
          className="flex-1 items-center"
          onPress={() => Alert.alert("View in Room button pressed")}
        >
          <Text style={infoPageStyle.buyButtonText}>View In Your Room</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
