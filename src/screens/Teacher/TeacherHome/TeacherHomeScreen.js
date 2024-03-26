import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/helper";

const coursesData = [
  { id: "1", name: "Mathematics", attendance: "85%" },
  { id: "2", name: "Physics", attendance: "78%" },
  { id: "3", name: "Chemistry", attendance: "92%" },
  // Add more courses as needed
];

const TeacherHomeScreen = () => {
  const renderCourseItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.subItemText}>Attendance: {item.attendance}</Text>
    </View>
  );

  const handleAddCourse = () => {
    // Обработка добавления нового курса
    console.log("Add Course");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses Overview</Text>
      <FlatList
        data={coursesData}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
        <Text style={styles.buttonText}>Add Course</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.openBlue,
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    backgroundColor: colors.second,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    color: colors.openGray,
  },
  subItemText: {
    fontSize: 16,
    color: colors.openGray,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: colors.openBlue,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: colors.openGray,
  },
});

export default TeacherHomeScreen;
