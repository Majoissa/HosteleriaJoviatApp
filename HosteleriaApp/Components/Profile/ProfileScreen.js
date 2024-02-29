import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

function ProfileScreen({ isUserLoggedIn, navigation }) {
  if (!isUserLoggedIn) {
    return (
      <View style={styles.container}>
        <Text>
          No està registrat. Comuniqui's amb administració per ser donat d'alta
          com a usuari.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")} // Asegúrate de tener la navegación configurada correctamente
        >
          <Text>Iniciar Sessió</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
