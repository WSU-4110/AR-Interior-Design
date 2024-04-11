import React from "react";
import { View } from "react-native";
import { Camera } from "expo-camera";

const UnityWithExpoCamera = () => {
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={"back"} // Specify 'back' as a string here
        autoFocus={Camera.Constants.AutoFocus.on}
        flashMode={Camera.Constants.FlashMode.off}
      />
    </View>
  );
};

export default UnityWithExpoCamera;


export default UnityWithExpoCamera;

