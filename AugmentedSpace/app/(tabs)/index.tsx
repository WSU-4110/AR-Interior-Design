import { Text, View } from "@/components/Themed";
import { getAuth, signOut } from "firebase/auth";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function Index() {
  const { currentUser } = getAuth();
  const signOutAndReroute = () => {
    signOut(getAuth());
    router.replace("../logIn");
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">Index Page</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Hello {currentUser?.email}.</Text>
      <Text>Expected to see catelog/main page here.</Text>
      {currentUser ? (<Pressable className="bg-red-500 p-8" onPress={signOutAndReroute}><Text>Sign Out Button</Text></Pressable>) : null}
      <Pressable className="bg-red-500 p-2" onPress={signOutAndReroute}><Text>Force Sign Out</Text></Pressable>
    </View>
  );
}
