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
import StarRating from "react-native-star-rating";


const ProductScreen = () => {
  //get params from index.tsx
  const { items } = useLocalSearchParams();
  const { imageSource } = useLocalSearchParams();
  const { itemCost } = useLocalSearchParams();
  const { brandName } = useLocalSearchParams();

  const [starCount, setStarCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  //log params
  console.log("items: " + items);
  console.log("imageSource: " + imageSource);
  console.log("itemCost: " + itemCost);
  console.log("brandName: " + brandName);

  const onStarRatingPress = (rating: number) => {
    setStarCount(rating);
    Alert.alert("Rating", `You have given a rating of ${rating} stars.`);
  };

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
    <ScrollView style={infoPageStyle.container}
      className="flex-1" >

      {/* Product image */}
      <View style={infoPageStyle.imageContainer}>
        <Image
          source={{uri: imageUrl}}
          style={infoPageStyle.productImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={infoPageStyle.view360Button}>
          <Text>360°</Text>
        </TouchableOpacity>
      </View>
      <View style={infoPageStyle.detailsContainer}>
        <View style={infoPageStyle.starRating}>
          <Text style={infoPageStyle.productName}>{items}</Text>
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
              Buy <Text style={infoPageStyle.priceText}>${itemCost}</Text>
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
