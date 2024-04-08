import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../utils/helper";
import { useAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { signed } from "../../../atoms";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app, auth, db, storage } from "../../../firebase/firebaseConfig";

// Dummy statistics for subjects
const subjectStatistics = [
  { subject: "Mathematics", score: 85 },
  { subject: "Physics", score: 70 },
  { subject: "Chemistry", score: 90 },
  // Add more subjects as needed
];

const StudentProfileScreen = () => {
  const [isSigned, setIsSigned] = useAtom(signed);
  const [studentData, setStudentData] = useState();
  const [loading, setLoading] = useState(false);

  const handleEditProfile = () => {
    // Implement edit profile functionality
    console.log("Edit profile");
  };

  const getStudentData = async () => {
    setLoading(true);
    let userId = await SecureStore.getItem("uid");
    try {
      const q = query(
        collection(db, "students"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      const teacherSubjects = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setStudentData({ id: doc.id, ...data });
      });
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleExit = async () => {
    // Implement exit functionality
    console.log("Exit");
    await SecureStore.deleteItemAsync("role");
    setIsSigned(false);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#3C57A1" />
        </View>
      )}

      <Text style={styles.title}>Профиль</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>ФИО:</Text>
        <Text style={styles.info}>
          {studentData?.firstName} {studentData?.lastName}
        </Text>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.info}>{studentData?.id}</Text>
        {/* Add more student data here */}
      </View>
      <View style={styles.statistics}>
        <Text style={styles.statisticsTitle}>Subject Statistics:</Text>
        {subjectStatistics.map((subjectStat) => (
          <View key={subjectStat.subject} style={styles.subjectStat}>
            <Text style={styles.subjectName}>{subjectStat.subject}</Text>
            <Text style={styles.subjectScore}>{subjectStat.score}%</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Редактировть профиль</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.buttonText}>Выйти</Text>
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
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: colors.openGray,
    marginBottom: 10,
  },
  statistics: {
    marginBottom: 20,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 10,
  },
  subjectStat: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  subjectName: {
    fontSize: 16,
    color: colors.openGray,
  },
  subjectScore: {
    fontSize: 16,
    color: colors.openGray,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: colors.openBlue,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  exitButton: {
    backgroundColor: colors.second,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: colors.openGray,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 2,
  },
});

export default StudentProfileScreen;
