import { Text, View } from "@/components/Themed";
import {
  SafeAreaView,
  Alert,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import ItemCard from "@/components/ItemCard";

import { CardStyle } from "@/styles/ItemCardStyle";

export default function Catalog() {
  const { colors } = useTheme();
  const { currentUser } = getAuth();

  var loop = [];
  for (let i = 1; i <= 24; i++) {
    loop.push(i);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center my-4">
      <TextInput
        className="rounded w-full h-20 bg-slate-300 rounded-r-xl align-middle content-center p-2 justify-center"
        style={{ color: colors.text }}
        placeholder="Search for items"
      >
        <Text style={{ color: colors.text }}>Test Input</Text>
      </TextInput>

      <View className="flex-row flex-wrap items-center">
        <FlatList
          contentContainerStyle={CardStyle.listContainer}
          data={loop}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: '/item-info/[items]',
              params: {
                  items: item
              }})
          }>
              <ItemCard
                itemName={"test"}
                brandName={"brandName"}
                itemCost={24.99}
              />
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}
