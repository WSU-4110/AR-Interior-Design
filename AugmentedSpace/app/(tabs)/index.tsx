import { Text, View } from "@/components/Themed";
import { Alert, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (

    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">Augmented Space</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.subtitle}>Add login and buttons here</Text>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Login button pressed")}>
        <Text style={styles.text}>{"Login"}</Text>
      </TouchableOpacity>

      
        <TouchableOpacity style={styles.button} onPress={() => router.push("/catalog")}>
          <Text style={styles.text}>{"Catalog Page"}</Text>
        </TouchableOpacity>

    </SafeAreaView>
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