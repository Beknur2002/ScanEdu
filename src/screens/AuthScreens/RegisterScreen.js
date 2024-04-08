import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/helper";
import { useAtom } from "jotai";
import { signed } from "../../atoms";
import * as SecureStore from "expo-secure-store";
import "../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, db, storage } from "../../firebase/firebaseConfig";
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

export default function Register() {
  const navigation = useNavigation();
  const [isSigned, setIsSigned] = useAtom(signed);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const addUser = async (role, userId, firstName, lastName) => {
    if (role == "Teacher") {
      try {
        const teachersRef = collection(db, "teachers");

        // Add a new document with auto-generated ID
        await addDoc(teachersRef, {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
        });

        console.log("New teachers added successfully");
      } catch (error) {
        console.error("Error adding teachers:", error);
      }
    } else {
      try {
        const studentsRef = collection(db, "students");

        // Add a new document with auto-generated ID
        await addDoc(studentsRef, {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
        });

        console.log("New students added successfully");
      } catch (error) {
        console.error("Error adding students:", error);
      }
    }
  };

  const handleRegisterStudent = async () => {
    // Password confirmation validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Registered user:", user.uid);

      // Your registration logic goes here
      console.log(
        "Registering with role:",
        role,
        "email:",
        email,
        "and password:",
        password
      );

      // Navigate to the appropriate screen after registration
      // navigation.navigate(role === "Teacher" ? "TeacherHome" : "StudentHome");
      SecureStore.setItemAsync("role", role);
      SecureStore.setItemAsync("uid", user.uid);
      SecureStore.setItemAsync("userName", name);
      SecureStore.setItemAsync("userSurName", lastName);
      await addUser(role, user.uid, name, lastName);
      setIsSigned(true);
    } catch (error) {
      console.error("Error registering:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  const handleRegisterTeacher = async () => {
    // Password confirmation validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Registered user:", user.uid);

      // Your registration logic goes here
      console.log(
        "Registering with role:",
        role,
        "email:",
        email,
        "and password:",
        password
      );

      // Navigate to the appropriate screen after registration
      // navigation.navigate(role === "Teacher" ? "TeacherHome" : "StudentHome");
      SecureStore.setItemAsync("role", role);
      SecureStore.setItemAsync("uid", user.uid);
      await addUser(role, user.uid, name, lastName);
      setIsSigned(true);
    } catch (error) {
      console.error("Error registering:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "Teacher" && styles.selectedRole]}
          onPress={() => setRole("Teacher")}
        >
          <Text style={styles.roleButtonText}>Препод</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === "Student" && styles.selectedRole]}
          onPress={() => setRole("Student")}
        >
          <Text style={styles.roleButtonText}>Студент</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        placeholderTextColor={"gray"}
        value={name}
        onChangeText={setName}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Фамилия"
        placeholderTextColor={"gray"}
        value={lastName}
        onChangeText={setLastName}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Почта"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor={"gray"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Повторите пароль"
        placeholderTextColor={"gray"}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={
          role === "Student" ? handleRegisterStudent : handleRegisterTeacher
        }
      >
        <Text style={styles.buttonText}>Регистрация</Text>
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
  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  roleButton: {
    backgroundColor: colors.second,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedRole: {
    backgroundColor: colors.openBlue,
  },
  roleButtonText: {
    fontSize: 18,
    color: colors.openGray,
  },
  input: {
    backgroundColor: colors.second,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: colors.openGray,
  },
  registerButton: {
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
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
});
