import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/helper";

// Dummy data for subjects
const subjectsData = [
  { id: "1", name: "Mathematics", time: "9:00 AM" },
  { id: "2", name: "Physics", time: "10:30 AM" },
  { id: "3", name: "Chemistry", time: "1:00 PM" },
  // Add more subjects as needed
];

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const StudentHomeScreen = () => {
  const [visitedSubjects, setVisitedSubjects] = useState({});

  const handleToggleVisit = (subjectId) => {
    setVisitedSubjects((prevState) => ({
      ...prevState,
      [subjectId]: !prevState[subjectId],
    }));
  };

  const renderSubjectItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
      <TouchableOpacity
        style={[
          styles.visitButton,
          visitedSubjects[item.id] && styles.visitedButton,
        ]}
        onPress={() => handleToggleVisit(item.id)}
      >
        <Text style={styles.buttonText}>
          {visitedSubjects[item.id] ? "Visited" : "Visit"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {daysOfWeek.map((day) => (
        <View key={day}>
          <Text style={styles.dayHeading}>{day}</Text>
          <FlatList
            data={subjectsData}
            renderItem={renderSubjectItem}
            keyExtractor={(item) => `${item.id}-${day}`}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    padding: 20,
  },
  dayHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 10,
  },
  item: {
    backgroundColor: colors.second,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    color: colors.openGray,
  },
  timeText: {
    fontSize: 16,
    color: colors.openGray,
  },
  visitButton: {
    backgroundColor: colors.openBlue,
    padding: 10,
    borderRadius: 8,
  },
  visitedButton: {
    backgroundColor: colors.openGray,
  },
  buttonText: {
    fontSize: 16,
    color: colors.openGray,
  },
});

export default StudentHomeScreen;
