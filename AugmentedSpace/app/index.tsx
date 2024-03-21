import { Redirect } from "expo-router";

export default function IndexScreen() {
  //  This page is required for expo-router to work properly. It is the default initial search.
  // We will redirect to the login page.
  return <Redirect href="/logIn" />;
}
