import { Text, View } from "@/components/Themed";
import { Button, Pressable, TextInput } from "react-native";
import { Linking } from "react-native";

export default function LogIn() {
  return (
    // <View className="flex-1 items-center justify-center">
    //   <Text className="font-bold text-xl">Index Page</Text>
    //   <View
    //     className="my-8 h-1 w-4/5"
    //     lightColor="#eee"
    //     darkColor="rgba(255,255,255,0.1)"
    //   />
    //   <Text>Expected to see catelog/main page here.</Text>
    // </View>
    <View className="flex-1 items-center justify-center px-6 pt-4 flex flex-col w-full space-y-4">
      {/* Email Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text className="text-md font-semibold text-white">Email</Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center">
          {/* <TextInput type="text" className="w-full h-full rounded-r flex items-center px-1 focus:outline-none" placeholder="example@email.com"> */}
          <TextInput placeholder="example@email.com" />
        </View>
      </View>

      {/* Password Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text className="text-md font-semibold text-white">Password</Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center">
          {/* <TextInput type="text" className="w-full h-full rounded-r flex items-center px-1 focus:outline-none" placeholder="**********"> */}
          <TextInput placeholder="**********" secureTextEntry={true} />
        </View>
      </View>

      {/* Register Password */}
      <View className="pt-6 w-full flex space-x-2 justify-between">
        <Pressable className="h-10 w-9/12 border-2 bg-slate-500 mix-blend-difference rounded-lg text-white text-center items-center justify-center font-semibold">
          <Text>Login</Text>
        </Pressable>
        {/* <Linking href="https://soefyansyah.com" className="h-10 w-5/12 bg-btn rounded-lg text-white text-center items-center py-2 font-semibold">Login</Linking> */}
        <Text>Sign Up</Text>
      </View>
    </View>
  );
}
