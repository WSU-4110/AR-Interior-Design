import { Text, View } from "@/components/Themed";
import { Button, Pressable, TextInput } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { Linking } from "react-native";
import React, { useState } from 'react';

export default function LogIn() {

  // const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed up 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });

  return (
    <View className="flex-1 items-center justify-center px-6 pt-4 flex flex-col w-full space-y-4">
      {/* Email Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text className="text-md font-semibold text-white">Email</Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center">
          <TextInput 
            placeholder="example@email.com" 
            onChangeText={emailInput => setEmail(emailInput)}/>
        </View>
      </View>

      {/* Password Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text className="text-md font-semibold text-white">Password</Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center">
          <TextInput 
            placeholder="**********" secureTextEntry={true} 
            onChangeText={passwordInput => setPassword(passwordInput)}/>
        </View>
      </View>

      {/* Register Password */}
      <View className="pt-6 w-full flex space-x-2 justify-between">
        <Pressable className="h-10 w-9/12 border-2 bg-slate-500 mix-blend-difference rounded-lg text-white text-center items-center justify-center font-semibold">
          <Text>Sign Up</Text>
        </Pressable>
        {/* <Linking href="https://soefyansyah.com" className="h-10 w-5/12 bg-btn rounded-lg text-white text-center items-center py-2 font-semibold">Login</Linking> */}
        <Text>Log In</Text>
      </View>
    </View>
  );
}
