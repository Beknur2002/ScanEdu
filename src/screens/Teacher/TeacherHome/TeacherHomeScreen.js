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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, db, storage } from "../../../firebase/firebaseConfig";
import * as SecureStore from "expo-secure-store";
import * as DocumentPicker from "expo-document-picker";
import QRCode from "react-native-qrcode-svg";

const TeacherHomeScreen = () => {
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
        where("teacherId", "==", teacherId)
      );
      const querySnapshot = await getDocs(q);

      const teacherSubjects = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        teacherSubjects.push({ id: doc.id, ...data });
      });

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

  const pickFile = async (subjectId) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false, // Set to true if you want to save a copy of the file in the app's cache directory
      });

      console.log("Result pick file: ", result);
      uploadPdfAndSaveUrl(subjectId, result.assets[0]);

      if (result.type === "success") {
        setPickedFile(result);
      } else {
        setPickedFile(null);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.subItemText}>Attendance: {item.type}</Text>
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
      {!item.pdfUrl && (
        <Button title="Add file" onPress={() => pickFile(item.id)} />
      )}
    </View>
  );

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses Overview</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Input field for course name */}
            <TextInput
              style={styles.input}
              placeholder="Course Name"
              value={courseName}
              onChangeText={setCourseName}
            />

            {/* Input field for course type */}
            <TextInput
              style={styles.input}
              placeholder="Course Type"
              value={courseType}
              onChangeText={setCourseType}
            />

            {/* Save and cancel buttons */}
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

export default TeacherHomeScreen;
