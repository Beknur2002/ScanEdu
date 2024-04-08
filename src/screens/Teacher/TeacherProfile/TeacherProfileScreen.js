import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../utils/helper";
import { useAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { signed } from "../../../atoms";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app, auth, db, storage } from "../../../firebase/firebaseConfig";

const TeacherProfileScreen = () => {
  const navigation = useNavigation();
  const [isSigned, setIsSigned] = useAtom(signed);
  const [teacherData, setTeacherData] = useState();
  const [loading, setLoading] = useState(false);

  const handleEditProfile = () => {
    navigation.navigate("EditTeacherProfile");
  };

  const handleExitProfile = async () => {
    await SecureStore.deleteItemAsync("role");
    setIsSigned(false);
  };

  const getTeacherData = async () => {
    setLoading(true);
    let userId = await SecureStore.getItem("uid");
    try {
      const q = query(
        collection(db, "teachers"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      const teacherSubjects = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setTeacherData({ id: doc.id, ...data });
      });
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const auth = getAuth();

  // Add an authentication state change listener
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      const email = user.email;
      const displayName = user.displayName;
      const photoURL = user.photoURL;

      SecureStore.setItem("uid", uid);

      // You can use this information as needed in your application
      console.log("User ID:", uid);
      console.log("Email:", email);
      console.log("Display Name:", displayName);
      console.log("Photo URL:", photoURL);

      // You may want to store this information in your app's state
      // or use it to render UI elements
    } else {
      // User is signed out
      console.log("User is signed out");
      console.log(user);
      console.log(auth);
    }
  });

  useEffect(() => {
    getTeacherData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#3C57A1" />
        </View>
      )}
      <Text style={styles.title}>Teacher Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>ФИО:</Text>
        <Text style={styles.info}>
          {teacherData?.firstName} {teacherData?.lastName}
        </Text>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.info}>{teacherData?.id}</Text>
        {/* Add more profile data as needed */}
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Редактировть профиль</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.editButton} onPress={handleExitProfile}>
        <Text style={styles.buttonText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    padding: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: colors.openGray,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: colors.openBlue,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: colors.openGray,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 20,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 2,
  },
});

export default TeacherProfileScreen;
