import { Text, View } from "@/components/Themed";
import {
  SafeAreaView,
  Alert,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import ItemCard from "@/components/ItemCard";

export default function Cart() {
  const { colors } = useTheme();
  const { currentUser } = getAuth();

  var loop = [];
  for (let i = 1; i <= 50; i++) {
    loop.push(i);
  }
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="font-bold text-xl">This Is Your Cart</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
            <FlatList
        className="flex flex-1 h-full w-full p-2"
        contentContainerStyle={{
          gap: 10,
          justifyContent: "space-around",
        }}
        data={loop}
        numColumns={2}
        renderItem={({ item }) => (
          <ItemCard
            onPress={() =>
              router.push({
                pathname: "/item-info/[items]",
                params: {
                  items: item,
                },
              })
            }
            itemName={"product name " + item}
            brandName={"brand name"}
            itemCost={24.99}
          />
        )}
      ></FlatList>
    </View>
    
  );
}
