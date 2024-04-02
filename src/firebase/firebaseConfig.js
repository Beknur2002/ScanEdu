import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKtwH2xl1XQEJFqqQWxLFcWh-H020JYZg",
  authDomain: "scanedu-1d7bf.firebaseapp.com",
  projectId: "scanedu-1d7bf",
  storageBucket: "scanedu-1d7bf.appspot.com",
  messagingSenderId: "3389675267",
  appId: "1:3389675267:web:cd626bb112ffa975917b36",
};

// export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db, storage };
