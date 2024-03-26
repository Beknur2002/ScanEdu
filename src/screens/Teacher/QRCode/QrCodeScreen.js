import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Barcode } from "expo-barcode-scanner";
import { colors } from "../../../utils/helper";

const QrCodeScreen = () => {
  const [qrValue, setQrValue] = useState("");

  const generateQRCode = () => {
    const uniqueCode = Math.random().toString(36).substring(7);
    setQrValue(uniqueCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code</Text>
      <TouchableOpacity style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>
      {qrValue !== "" && (
        <View style={styles.qrContainer}>
          <Barcode value={qrValue} width={200} height={200} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    padding: 20,
    alignItems: "center",
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
});

export default QrCodeScreen;
