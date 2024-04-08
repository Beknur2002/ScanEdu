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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function TeacherLogin() {
  const navigation = useNavigation();
  const [isSigned, setIsSigned] = useAtom(signed);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user.uid);

      // Set user role to Teacher
      SecureStore.setItemAsync("role", "Teacher");
      setIsSigned(true);

      // Navigate to the appropriate screen after login
      // For example, you can navigate to the Teacher Home screen
      // navigation.navigate("TeacherHome");
    } catch (error) {
      console.error("Error logging in:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Авторизация для преподавателя</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
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
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.second,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: colors.openGray,
  },
  loginButton: {
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
  registerText: {
    color: colors.openBlue,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
