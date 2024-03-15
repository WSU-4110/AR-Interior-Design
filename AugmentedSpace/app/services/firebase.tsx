import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { Auth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Define Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID + ".firebaseapp.com",
  databaseURL:
    "https://" + process.env.EXPO_PUBLIC_FIREBASE_PROJECTID + ".firebaseio.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID + ".appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export class FirebaseManager {
  private static instance: FirebaseManager;
  private readonly app!: FirebaseApp;
  private readonly auth!: Auth;

  private constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = initializeAuth(this.app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }

  public static getInstance(): FirebaseManager {
    if (!FirebaseManager.instance) {
      FirebaseManager.instance = new FirebaseManager();
    }
    return FirebaseManager.instance;
  }

  public getApp(): FirebaseApp {
    return this.app;
  }

  public getAuth(): Auth {
    return this.auth;
  }
}
export const FirebaseInstance = FirebaseManager.getInstance();

export default FirebaseManager;
