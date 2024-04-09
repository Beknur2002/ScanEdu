import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import StudentHomeScreen from "../screens/Student/StudentHome/StudentHomeScreen";
import StudentProfileScreen from "../screens/Student/StudentProfile/StudentProfileScreen";
import QrCodeScreen from "../screens/Teacher/QRCode/QrCodeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Главная") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "QR") {
            iconName = focused ? "qr-code" : "qr-code-outline";
          } else if (route.name === "Профиль") {
            iconName = focused ? "person" : "person-outline";
          }

          // Возвращаем компонент иконки
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Главная" component={StudentHomeScreen} />
      <Tab.Screen name="QR" component={QrCodeScreen} />
      <Tab.Screen name="Профиль" component={StudentProfileScreen} />
    </Tab.Navigator>
  );
};

export default StudentTabNavigator;

const styles = StyleSheet.create({});
