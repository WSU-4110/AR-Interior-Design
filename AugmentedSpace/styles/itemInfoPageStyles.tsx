import { LightTheme } from "@/constants/ColorThemes";
import { DarkTheme, useTheme } from "@react-navigation/native";

import { StyleSheet } from "react-native";
export const infoPageStyle = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 80,
  },
  productImage: {
    width: 250,
    height: 280,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "column",
    backgroundColor: LightTheme.colors.background,
  },
  productName: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 26,
    color: LightTheme.colors.text,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 19,
    color: LightTheme.colors.text,
    lineHeight: 24,
    marginTop: -30,
    marginBottom: 0,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 20,
  },
  buyButton: {
    backgroundColor: LightTheme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    //shadowColor: colors.shadow,
    shadowOpacity: 1,
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
    marginTop: -20,
    shadowOffset: { width: 2, height: 2 },
    //shadowColor: colors.shadow,
    shadowOpacity: 1,
  },
  addToCartButton: {
    backgroundColor: LightTheme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    //shadowColor: colors.shadow,
    shadowOpacity: 1,
  },
  addToCartButtonText: {
    color: LightTheme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 20,
  },
});
