import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { colors } from "../../../utils/helper";
import SecureStore from "expo-secure-store";
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

const Students = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddstudents = () => {
    console.log("Add Material");
  };

  const getStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "students"));
      const querySnapshot = await getDocs(q);

      const teacherSubjects = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        teacherSubjects.push({ id: doc.id, ...data });
        console.log({ id: doc.id, ...data });
      });
      setStudentData(teacherSubjects);
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Примерный список материалов
  const materials = [
    { id: "1", name: "Lecture 1", format: "pdf" },
    { id: "2", name: "Presentation 1", format: "pdf" },
    { id: "3", name: "Textbook", format: "pdf" },
    // Добавьте больше материалов при необходимости
  ];

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#3C57A1" />
        </View>
      )}

      <Text style={styles.title}>Список студентов</Text>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#3C57A1" />
        </View>
      ) : (
        studentData.map((material, index) => (
          <View style={styles.card}>
            <View key={material.id} style={styles.item}>
              <Text style={styles.itemText}>
                {index + 1}.{material.lastName}{" "}
              </Text>
              <Text style={styles.itemText}>{material.firstName}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddstudents}
            >
              <Text style={styles.buttonText}>
                Добавить замечание к студенту
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.openGray }]}
        onPress={handleAddstudents}
      >
        <Text style={[styles.buttonTex, { color: "#000000" }]}>
          Добавить студента
        </Text>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.second,
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.second,
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    color: colors.openGray,
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

export default Students;
