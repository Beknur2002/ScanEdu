import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../utils/helper";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, db, storage } from "../../../firebase/firebaseConfig";
import * as SecureStore from "expo-secure-store";
import * as DocumentPicker from "expo-document-picker";
import QRCode from "react-native-qrcode-svg";

const StudentHomeScreen = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [loading, setLoading] = useState(false);
  const [pickedFile, setPickedFile] = useState(null);

  const getTeacherSubjects = async () => {
    setLoading(true);
    let teacherId = await SecureStore.getItem("uid");
    try {
      const q = query(
        collection(db, "teacher_subjects"),
        where("teacherId", "!=", teacherId)
      );
      const querySnapshot = await getDocs(q);

      const teacherSubjects = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        teacherSubjects.push({ id: doc.id, ...data });
      });
      console.log(teacherSubjects);

      setCourses(teacherSubjects);
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
      setCourses([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addTeacherSubject = async (name, teacherId, type) => {
    try {
      const teacherSubjectsRef = collection(db, "teacher_subjects");

      // Add a new document with auto-generated ID
      await addDoc(teacherSubjectsRef, {
        name: name,
        teacherId: teacherId,
        type: type,
      });

      console.log("New teacher_subject added successfully");
    } catch (error) {
      console.error("Error adding teacher_subject:", error);
    }
  };

  const uploadPdfAndSaveUrl = async (subjectId, pdfFile) => {
    let db = getFirestore();
    try {
      // Step 1: Upload PDF to Firebase Storage
      const storage2 = getStorage();
      const pdfRef = ref(storage2, `pdfs/${subjectId}/${pdfFile.name}`);
      await uploadBytes(pdfRef, pdfFile);

      // Step 2: Get Download URL of the uploaded PDF
      const downloadUrl = await getDownloadURL(pdfRef);
      console.log(downloadUrl);

      // Step 3: Save URL in Firestore for the subject
      // await db.collection("teacher_subjects").doc(subjectId).update({
      //   pdfUrl: downloadUrl,
      // });
      await updateDoc(doc(db, "teacher_subjects", subjectId), {
        pdfUrl: downloadUrl,
      });

      console.log("PDF uploaded and URL saved:", downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading PDF and saving URL:", error);
      // Handle error here, such as showing an error message to the user
      return null;
    } finally {
      getTeacherSubjects();
    }
  };

  const attendTheLesson = async (subjectId, studentObject) => {
    console.log(subjectId);
    console.log(studentObject);
    try {
      let db = getFirestore();

      const subjectDocRef = doc(
        db,
        "teacher_subjects",
        JSON.stringify(subjectId)
      );
      // const subjectDocSnapshot = await getDoc(subjectDocRef);

      // const { subject_students } = subjectDocSnapshot.data();
      console.log(subjectDocRef);

      // const updatedStudentsArray = [...subject_students, studentObject];

      // await updateDoc(doc(db, "teacher_subjects", subjectId), {
      //   subject_students: updatedStudentsArray,
      // });

      console.log("Student added successfully.");
    } catch (error) {
      console.error("Error s file:", error);
    } finally {
      getTeacherSubjects();
    }
  };

  const handleAddCourse = () => {
    setIsModalVisible(true);
  };

  const handleSaveCourse = async () => {
    let teacherId = await SecureStore.getItem("uid");
    console.log("Course Name:", courseName);
    console.log("Course Type:", courseType);
    addTeacherSubject(courseName, teacherId, courseType);
    setIsModalVisible(false);
    getTeacherSubjects();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getTeacherSubjects();
  }, []);

  let userId = SecureStore.getItem("uid");
  let username = SecureStore.getItem("userName");
  let userSurname = SecureStore.getItem("userSurName");

  const renderCourseItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.subItemText}>Дполонительно: {item.type}</Text>
      {/* <Text style={styles.subItemText}>Pdf uri: {item.pdfUrl}</Text> */}
      {item.pdfUrl && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <QRCode
            value={item.pdfUrl}
            size={180}
            logo={require("../../../../assets/icon.png")}
          />
        </View>
      )}
      {!item.subject_students.find((el) => (el.studentId = userId)) && (
        <Button
          title="Отметиться"
          onPress={() =>
            attendTheLesson(item.id, {
              studentId: userId,
              name: username,
              surname: userSurname,
            })
          }
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Обзор курсов</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={courses}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {/* <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
        <Text style={styles.buttonText}>Добавить курс</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Название курса"
              value={courseName}
              onChangeText={setCourseName}
            />

            <TextInput
              style={styles.input}
              placeholder="Дполонительно"
              value={courseType}
              onChangeText={setCourseType}
            />

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="Save" onPress={handleSaveCourse} />
            </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default StudentHomeScreen;
