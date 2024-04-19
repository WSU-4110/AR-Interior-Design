import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

export default function ARView() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Test</Text>
    </View>
  );
}
