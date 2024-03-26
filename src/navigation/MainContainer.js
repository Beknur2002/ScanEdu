import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAtom } from "jotai";
import { signed } from "../atoms";
import * as SecureStore from "expo-secure-store";
import TeacherTabNavigator from "./TeacherTabNavigator";
import StudentTabNavigator from "./StudentTabNavigator";
import WelcomeScreen from "../screens/AuthScreens/WelcomeScreen";
import StudentLogin from "../screens/AuthScreens/StudentLogin";
import TeacherLogin from "../screens/AuthScreens/TeacherLogin";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainContainer = () => {
  const [isSigned, setIsSigned] = useAtom(signed);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getid = async () => {
      let token = await SecureStore.getItemAsync("access_token");
      let role = await SecureStore.getItemAsync("role");
      if (role) {
        setIsSigned(true);
        setRole(role);
      } else {
        setRole("");
        setIsSigned(false);
      }
    };

    getid();
  }, [isSigned]);

  return (
    <NavigationContainer>
      {isSigned ? (
        role == "Teacher" ? (
          <TeacherTabNavigator />
        ) : (
          <StudentTabNavigator />
        )
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="StudentLogin" component={StudentLogin} />
          <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
