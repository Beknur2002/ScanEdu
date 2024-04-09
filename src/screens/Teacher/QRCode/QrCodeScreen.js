import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Barcode } from "expo-barcode-scanner";
import { colors } from "../../../utils/helper";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const QrCodeScreen = () => {
  const [qrValue, setQrValue] = useState("");
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const generateQRCode = () => {
    const uniqueCode = Math.random().toString(36).substring(7);
    setQrValue(uniqueCode);
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Generate QR Code</Text>
      <TouchableOpacity style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity> */}
      {/* {qrValue !== "" && (
        <View style={styles.qrContainer}>
          <Barcode value={qrValue} width={200} height={200} />
        </View>
      )} */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Сделать фото</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Галерея</Text>
      </TouchableOpacity> */}

      {/* <Button title={"Take Picture"} onPress={takePicture} />
      <Button title={"Gallery"} onPress={pickImage} /> */}
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    padding: 20,
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.openBlue,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.openBlue,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: colors.openGray,
  },
  qrContainer: {
    marginTop: 20,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  // button: {
  //   flex: 0.1,
  //   padding: 10,
  //   alignSelf: "flex-end",
  //   alignItems: "center",
  // },
});

export default QrCodeScreen;
