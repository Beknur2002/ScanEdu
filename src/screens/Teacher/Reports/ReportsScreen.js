import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { colors } from "../../../utils/helper";

const ReportsScreen = () => {
  // Фиктивные данные
  const studentsAttendance = [
    { id: "1", name: "Student 1", attendance: "Present" },
    { id: "2", name: "Student 2", attendance: "Absent" },
    { id: "3", name: "Student 3", attendance: "Present" },
    // Добавьте больше данных при необходимости
  ];

  const attendanceReports = [
    { id: "1", student: "Student 1", attendance: "Present" },
    { id: "2", student: "Student 2", attendance: "Absent" },
    { id: "3", student: "Student 3", attendance: "Present" },
    // Добавьте больше данных при необходимости
  ];

  // Функция для рассчета средней посещаемости
  const calculateAverageAttendance = () => {
    const totalStudents = studentsAttendance.length;
    const presentStudents = studentsAttendance.filter(
      (student) => student.attendance === "Present"
    ).length;
    const averageAttendance =
      ((presentStudents / totalStudents) * 100).toFixed(2) + "%";
    return averageAttendance;
  };

  // Функция для отправки сообщения
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Message sent:", message);
    setModalVisible(false);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Average Attendance: {calculateAverageAttendance()}
        </Text>
        {/* Добавьте сюда другие данные, например, средние оценки */}
      </View>
      <Text style={styles.title}>Attendance Reports</Text>
      {attendanceReports.map((report) => (
        <View key={report.id} style={styles.report}>
          <Text style={styles.studentName}>{report.student}</Text>
          <Text style={styles.attendance}>{report.attendance}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Send Warning</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send Warning</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your message"
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
      </Modal>
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
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: colors.openGray,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.openBlue,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: colors.openGray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.second,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 20,
  },
  report: {
    backgroundColor: colors.second,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
    color: colors.openGray,
  },
  attendance: {
    fontSize: 16,
    color: colors.openGray,
    marginTop: 5,
  },
});

export default ReportsScreen;
