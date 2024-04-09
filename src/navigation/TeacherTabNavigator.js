import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TeacherHomeScreen from "../screens/Teacher/TeacherHome/TeacherHomeScreen";
import TeacherProfileScreen from "../screens/Teacher/TeacherProfile/TeacherProfileScreen";
import QrCodeScreen from "../screens/Teacher/QRCode/QrCodeScreen";
import StudentsScreen from "../screens/Teacher/Reports/StudentsScreen";
import Students from "../screens/Teacher/Students/Students";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TeacherTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Главная") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Студенты") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "QR") {
            iconName = focused ? "qr-code" : "qr-code-outline";
          } else if (route.name === "Отчеты") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Профиль") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Главная" component={TeacherHomeScreen} />
      <Tab.Screen name="Студенты" component={Students} />
      <Tab.Screen name="QR" component={QrCodeScreen} />
      {/* <Tab.Screen name="Отчеты" component={StudentsScreen} /> */}
      <Tab.Screen name="Профиль" component={TeacherProfileScreen} />
    </Tab.Navigator>
  );
};

export default TeacherTabNavigator;

const styles = StyleSheet.create({});
