import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ListViewComponent from "../MainScreen/ListView";

function FooterNavbar({
  setActiveContent,
  isUserLoggedIn,
  navigation,
  setShowProfile,
}) {
  const [activeButton, setActiveButton] = useState("Home");

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
    setActiveContent(buttonName);
  };

  const handleProfilePress = () => {
    if (isUserLoggedIn) {
      setShowProfile(true); // Indicar a HomeScreen que muestre el componente de perfil
    } else {
      // Si el usuario no está autenticado, navega a la pantalla de inicio de sesión
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[
          styles.iconText,
          activeButton === "Profile" && styles.activeButton,
        ]}
        onPress={handleProfilePress}
      >
        <Ionicons
          name={activeButton === "Profile" ? "person" : "person-outline"}
          size={25}
          color="white"
        />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconText,
          activeButton === "Home" && styles.activeButton,
        ]}
        onPress={() => handlePress("Home")}
      >
        <Ionicons
          name={activeButton === "Home" ? "md-home-sharp" : "md-home-outline"}
          size={25}
          color="white"
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconText,
          activeButton === "Favorite" && styles.activeButton,
        ]}
        onPress={() => handlePress("Favorite")}
      >
        <Ionicons
          name={activeButton === "Favorite" ? "md-heart" : "md-heart-outline"}
          size={25}
          color="white"
        />
        <Text style={styles.text}>Favorite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    color: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 50,
    paddingVertical: 15,
    position: "relative",
    bottom: 0,
  },
  iconText: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default FooterNavbar;
