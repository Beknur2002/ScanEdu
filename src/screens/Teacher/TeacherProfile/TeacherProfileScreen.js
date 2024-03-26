import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../utils/helper";
import { useAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { signed } from "../../../atoms";

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
