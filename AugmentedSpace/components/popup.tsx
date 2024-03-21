import { Platform, Alert, ToastAndroid } from "react-native";

export const ShowPopup = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    Alert.alert(message);
  }
};
