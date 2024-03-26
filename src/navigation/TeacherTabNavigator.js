import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import TeacherHomeScreen from "../screens/Teacher/TeacherHome/TeacherHomeScreen";
import TeacherProfileScreen from "../screens/Teacher/TeacherProfile/TeacherProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TeacherTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TeacherHome" component={TeacherHomeScreen} />
      <Tab.Screen name="TeacherProfile" component={TeacherProfileScreen} />
    </Tab.Navigator>
  );
};

export default TeacherTabNavigator;

const styles = StyleSheet.create({});
