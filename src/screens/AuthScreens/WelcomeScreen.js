import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/helper";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [role, setRole] = useState("");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    // Navigating to another screen based on selected role
    navigation.navigate(
      selectedRole === "Teacher" ? "TeacherLogin" : "StudentLogin"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScanEdu</Text>
      <TouchableOpacity
        style={[styles.roleButton, role === "Teacher" && styles.selectedRole]}
        onPress={() => handleRoleSelection("Teacher")}
      >
        <Text style={styles.roleButtonText}>Teacher</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.roleButton, role === "Student" && styles.selectedRole]}
        onPress={() => handleRoleSelection("Student")}
      >
        <Text style={styles.roleButtonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 30,
  },
  roleButton: {
    backgroundColor: colors.second,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: colors.openBlue,
  },
  roleButtonText: {
    fontSize: 18,
    color: colors.openGray,
  },
});
