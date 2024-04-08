import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCh8iR8_8T97ymgmeL9-V-zWpbOeyHeWgA",
  authDomain: "taller-f315b.firebaseapp.com",
  projectId: "taller-f315b",
  storageBucket: "taller-f315b.appspot.com",
  messagingSenderId: "77448418585",
  appId: "1:77448418585:web:69066f75e471ecb917e188",
  databaseURL: "https://taller-f315b-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
//export const auth=getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime = getDatabase(app);
