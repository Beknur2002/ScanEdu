import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../utils/helper";
import { useAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { signed } from "../../../atoms";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Dummy teacher profile data
const teacherProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  groupsCount: 5, // Example count of groups
  // Add more profile data as needed
};

const TeacherProfileScreen = () => {
  const navigation = useNavigation();
  const [isSigned, setIsSigned] = useAtom(signed);

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    navigation.navigate("EditTeacherProfile");
  };

  const handleExitProfile = async () => {
    await SecureStore.deleteItemAsync("role");
    setIsSigned(false);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.info}>{teacherProfile.firstName}</Text>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.info}>{teacherProfile.lastName}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{teacherProfile.email}</Text>
        <Text style={styles.label}>Groups Count:</Text>
        <Text style={styles.info}>{teacherProfile.groupsCount}</Text>
        {/* Add more profile data as needed */}
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.editButton} onPress={handleExitProfile}>
        <Text style={styles.buttonText}>Exit Profile</Text>
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
});

export default TeacherProfileScreen;
