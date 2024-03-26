import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/helper";

const MaterialsScreen = () => {
  const handleAddMaterial = () => {
    // Обработка добавления нового материала
    console.log("Add Material");
  };

  // Примерный список материалов
  const materials = [
    { id: "1", name: "Lecture 1", format: "pdf" },
    { id: "2", name: "Presentation 1", format: "pdf" },
    { id: "3", name: "Textbook", format: "pdf" },
    // Добавьте больше материалов при необходимости
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materials</Text>
      {materials.map((material) => (
        <View key={material.id} style={styles.item}>
          <Text style={styles.itemText}>{material.name}</Text>
          <Text style={styles.itemText}>{material.format}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddMaterial}>
        <Text style={styles.buttonText}>Add Material</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.second,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
});

export default MaterialsScreen;
