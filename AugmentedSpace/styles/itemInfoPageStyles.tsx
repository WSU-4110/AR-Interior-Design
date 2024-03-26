import { LightTheme } from "@/constants/ColorThemes";
import { StyleSheet } from "react-native";
export const infoPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100,
  },
  productImage: {
    width: 250,
    height: 280,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: LightTheme.colors.background,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 22,
    color: LightTheme.colors.text,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    color: LightTheme.colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  buyButton: {
    backgroundColor: LightTheme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  buyButtonText: {
    color: LightTheme.colors.text,
    fontSize: 30,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 30,
    fontWeight: "bold",
    color: LightTheme.colors.text,
  },
  viewInYourRoomButton: {
    alignItems: "center",
    backgroundColor: LightTheme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 0,
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    marginTop: 20,
  },
});