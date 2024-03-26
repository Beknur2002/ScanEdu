import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import StudentHomeScreen from "../screens/Student/StudentHome/StudentHomeScreen";
import StudentProfileScreen from "../screens/Student/StudentProfile/StudentProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="StudentHome" component={StudentHomeScreen} />
      <Tab.Screen name="StudentProfile" component={StudentProfileScreen} />
    </Tab.Navigator>
  );
};

export default StudentTabNavigator;

const styles = StyleSheet.create({});
