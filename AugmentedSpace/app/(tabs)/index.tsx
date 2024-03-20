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
import { FirebaseInstance } from "../services/firebase";
import { useTheme } from "@react-navigation/native";
import ItemCard from "@/components/ItemCard";

export default function CatalogScreen() {
  const { colors } = useTheme();
  const { currentUser } = FirebaseInstance.getAuth();

  var loop = [];
  for (let i = 1; i <= 50; i++) {
    loop.push(i);
  }

  return (
    <View
      className="flex-1 items-center justify-center my-4"
      style={{ backgroundColor: colors.background }}
    >
      <TextInput
        className="rounded w-full h-20 bg-slate-300 rounded-r-xl align-middle content-center p-2 justify-center"
        style={{ color: colors.text }}
        placeholder="Search for items"
      >
        <Text style={{ color: colors.text }}>Test Input</Text>
      </TextInput>

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
