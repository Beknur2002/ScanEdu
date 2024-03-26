import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/helper";

const subjectsData = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Physics" },
  { id: "3", name: "Chemistry" },
  // Add more subjects as needed
];

const groupsData = [
  {
    id: "1",
    name: "Group 1",
    students: ["Student 1", "Student 2", "Student 3"],
  },
  {
    id: "2",
    name: "Group 2",
    students: ["Student 4", "Student 5", "Student 6"],
  },
  // Add more groups as needed
];

const TeacherHomeScreen = () => {
  const renderSubjectItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  const renderGroupItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.subItemText}>{item.students.join(", ")}</Text>
    </View>
  );

  const handleAddSubject = () => {
    // Handle adding a new subject
    console.log("Add Subject");
  };

  const handleAddGroup = () => {
    // Handle adding a new group
    console.log("Add Group");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects</Text>
      <FlatList
        data={subjectsData}
        renderItem={renderSubjectItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
        <Text style={styles.buttonText}>Add Subject</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Groups</Text>
      <FlatList
        data={groupsData}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddGroup}>
        <Text style={styles.buttonText}>Add Group</Text>
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
