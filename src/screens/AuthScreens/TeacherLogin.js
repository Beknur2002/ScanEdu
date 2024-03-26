import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/helper";
import { useAtom } from "jotai";
import { signed } from "../../atoms";
import * as SecureStore from "expo-secure-store";

export default function TeacherLogin() {
  const navigation = useNavigation();
  const [isSigned, setIsSigned] = useAtom(signed);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    SecureStore.setItemAsync("role", "Teacher");
    setIsSigned(true);
    // Implement your login logic here
    console.log("Logging in with email:", email, "and password:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Login</Text>
      <TextInput
        placeholderTextColor={"gray"}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholderTextColor={"gray"}
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerText}>Not registered? Register here</Text>
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
  },
});
