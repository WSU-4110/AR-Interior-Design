import { Text, View } from "@/components/Themed";
import { Button, Alert, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (

    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">Augmented Space</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.subtitle}>Add login and buttons here</Text>

      <Pressable style={styles.button} onPress={() => Alert.alert("Login button pressed")}>
        <Text style={styles.text}>{"Login"}</Text>
      </Pressable>

      
        <Pressable style={styles.button} onPress={() => router.push("/catalog")}>
          <Text style={styles.text}>{"Catalog Page"}</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'gray',
    marginVertical: 8
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    justifyContent: 'center'

  }

})