import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Navbar from "../Navbar/Navbar";
import FooterNavbar from "../FooterNavbar/FooterNavbar";
import CarouselDef from "../Carousel/CaroselDef";
import RestaurantInfoCard from "../RestaurantInfoCard/RestaurantInfoCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ItemDev from "./ItemDev";

function JoviatScreen() {
  const [activeContent, setActiveContent] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Navbar
        showGoBack={true}
        showLogIn={false}
        showSearch={false}
        text="Login"
      />
      <View style={styles.group}>
        <CarouselDef
          fotos={[
            "https://media-cdn.tripadvisor.com/media/photo-o/0e/bc/c0/28/escola-joviat.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-o/1a/a3/f0/29/photo3jpg.jpg",
          ]}
        />
      </View>
      <ScrollView style={{ zIndex: -2 }}>
        <RestaurantInfoCard
          titol="Escola Joviat"
          descripcio="L’equip de metodologia d’Hoteleria ha dissenyat la transformació de l’Escola cap a un centre de Gastronomia on l’alumnat reflexiona sobre el coneixement i no sobre la norma. Cerca, es fa preguntes, observa, es relaciona, crea i comunica. Un centre connectat al territori i al producte (Slow Food), a les persones i a la cultura, a la tradició i a l’evolució. Un centre des d’on crear una xarxa de coneixement que parteix del Bages i arriba al món."
          web="https://www.joviat.com/joviat-hoteleria/restaurant-pedagogic-hostal-espai-gastronomic/"
          tel="938723383"
          ubicacion="https://maps.app.goo.gl/yFE6WtoDNzQnmCP98"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 4,
              backgroundColor: "black",
              marginLeft: 15,
            }}
          />
          <View>
            <Text
              style={{
                paddingHorizontal: 8,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Desenvolupadors de l'App
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 4,
              backgroundColor: "black",
              marginRight: 15,
            }}
          />
        </View>
        <ItemDev
          name="Anna Victoria Scribelka"
          foto={require("../ChefList/UserChef.png")}
          descripcio="Ha estudiat a la Joviat des de l'any 2014."
          isLast={false}
          showLinkedin={false}
          showMail={true}
          showPhone={false}
          mail="victoriaeso904@gmail.com"
        />
        <ItemDev
          name="María José Issa"
          foto={{
            uri: "https://raw.githubusercontent.com/Majoissa/Majoissa.github.io/main/imagenes/majo.png",
          }}
          descripcio="Desenvolupador. Ha estudiat desenvolupament d'aplicacions mòbils i videojocs a Joviat"
          isLast={false}
          showLinkedin={true}
          showPhone={true}
          showMail={true}
          linkedin="https://www.linkedin.com/in/mariajoseissa/"
          mail="issamariajose@gmail.com"
          phone="613979284"
        />
        <ItemDev
          name="Tulio Toledo Bigon"
          foto={require("../../assets/tulio.jpg")}
          descripcio="Desenvolupador. Ha estudiat desenvolupament d'aplicacions mòbils i videojocs a Joviat"
          isLast={false}
          showLinkedin={true}
          showPhone={true}
          showMail={true}
          linkedin="https://www.linkedin.com/in/tulio-toledo-bigon-606744273/"
          mail="tuliontoledobigon2@gmail.com"
          phone="613979247"
        />
        <ItemDev
          name="Ismael"
          foto={require("../ChefList/UserChef.png")}
          descripcio="Desenvolupador. Ha estudiat desenvolupament d'aplicacions mòbils i videojocs a Joviat"
          isLast={false}
          showLinkedin={false}
          showPhone={false}
          showMail={true}
        />
      </ScrollView>
      <FooterNavbar setActiveContent={activeContent} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  group: {
    position: "relative",
    overflow: "visible",
    marginBottom: 225,
    marginTop: 100,
  },
  touchStyle: {
    top: 140,
    width: "15%",
    alignSelf: "flex-end",
    right: 25,
  },
});
export default JoviatScreen;
