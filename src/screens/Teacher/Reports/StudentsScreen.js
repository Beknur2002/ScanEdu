import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, db, storage } from "../../../firebase/firebaseConfig";
import { colors } from "../../../utils/helper";

const StudentsScreen = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [editingStudentName, setEditingStudentName] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    // const unsubscribe = firebase
    //   .firestore()
    //   .collection("students")
    //   .onSnapshot((snapshot) => {
    //     const studentsList = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setStudents(studentsList);
    //   });
    // return () => unsubscribe();
  }, []);

  const addStudent = async () => {
    try {
      await firebase
        .firestore()
        .collection("students")
        .add({ name: newStudentName });
      setNewStudentName("");
    } catch (error) {
      console.error("Error adding student: ", error);
      Alert.alert("Error", "Failed to add student. Please try again later.");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await firebase.firestore().collection("students").doc(id).delete();
    } catch (error) {
      console.error("Error deleting student: ", error);
      Alert.alert("Error", "Failed to delete student. Please try again later.");
    }
  };

  const editStudent = async () => {
    try {
      await firebase
        .firestore()
        .collection("students")
        .doc(editingStudentId)
        .update({ name: editingStudentName });
      setEditingStudentId(null);
      setEditingStudentName("");
    } catch (error) {
      console.error("Error editing student: ", error);
      Alert.alert("Error", "Failed to edit student. Please try again later.");
    }
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      {editingStudentId === item.id ? (
        <TextInput
          style={styles.editInput}
          value={editingStudentName}
          onChangeText={setEditingStudentName}
        />
      ) : (
        <Text>{item.name}</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button
          title={editingStudentId === item.id ? "Сохранить" : "Редактировать"}
          onPress={() => {
            if (editingStudentId === item.id) {
              editStudent();
            } else {
              setEditingStudentId(item.id);
              setEditingStudentName(item.name);
            }
          }}
        />
        <Button title="Удалить" onPress={() => deleteStudent(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Студенты</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newStudentName}
          onChangeText={setNewStudentName}
          placeholder="Введите имя студента"
        />
        <Button title="Добавить студента" onPress={addStudent} />
      </View>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default StudentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.main,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});
