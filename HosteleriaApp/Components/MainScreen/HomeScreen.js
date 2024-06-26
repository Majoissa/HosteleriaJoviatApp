import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import MapViewComponent from "./MapView";
import ListViewComponent from "./ListView";
import SwitchBar from "./SwitchBar";
import Navbar from "../Navbar/Navbar";
import FooterNavbar from "../FooterNavbar/FooterNavbar";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../AuthContext";
import { signOut } from "firebase/auth";

function HomeScreen() {
  const [filteredData, setFilteredData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [restaurantsDataOriginal, setRestaurantsDataOriginal] = useState([]);
  const [isMapView, setIsMapView] = useState(false);
  const navigation = useNavigation();
  const [activeContent, setActiveContent] = useState("Home");

  const { currentUser } = useAuth();
  console.log("current user in homescreen: ", currentUser);

  // Función para obtener los datos de los restaurantes
  const fetchRestaurantsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Restaurant"));
      const restaurants = [];
      querySnapshot.forEach((doc) => {
        const restaurantData = {
          id: doc.id,
          ...doc.data(),
          workers: [], // Preparamos para llenar con datos de los trabajadores
        };
        restaurants.push(restaurantData);
      });
      setRestaurantsDataOriginal(restaurants);
      setRestaurantsData(restaurants);
      // Llamar a la función para cargar los trabajadores después de obtener los datos de los restaurantes
      fetchAndSetWorkers(restaurants);
    } catch (error) {
      console.error("Error al obtener los datos de los restaurantes", error);
    }
  };

  // Función para obtener los trabajadores del restaurante
  const fetchWorkersData = async (restaurantId) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Restaurant", restaurantId, "alumnes")
      );
      const workers = [];
      querySnapshot.forEach((doc) => {
        workers.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return workers;
    } catch (error) {
      console.error("Error al obtener los datos de los trabajadores", error);
    }
  };

  // Función para cargar los trabajadores de cada restaurante
  const fetchAndSetWorkers = async (restaurants) => {
    try {
      const promises = restaurants.map(async (restaurant) => {
        const workers = await fetchWorkersData(restaurant.id);
        return { ...restaurant, workers };
      });
      const updatedRestaurantsData = await Promise.all(promises);
      setRestaurantsDataOriginal(updatedRestaurantsData);
      // Actualizar los datos filtrados con todos los datos originales
      setFilteredData(updatedRestaurantsData);
    } catch (error) {
      console.error(
        "Error al cargar los trabajadores de los restaurantes",
        error
      );
    }
  };

  useEffect(() => {
    // Obtener los datos de los restaurantes al montar el componente
    fetchRestaurantsData();
  }, []);

  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  const handleSearch = (search) => {
    console.log("Búsqueda:", search);
    const filteredRestaurants = restaurantsDataOriginal.filter((restaurant) => {
      const restaurantNameMatch = restaurant.nom
        .toLowerCase()
        .includes(search.toLowerCase());
      const workerNameMatch = restaurant.workers.some((worker) =>
        worker.nom.toLowerCase().includes(search.toLowerCase())
      );
      return restaurantNameMatch || workerNameMatch;
    });
    setFilteredData(filteredRestaurants); // Actualizar los datos filtrados
  };

  //funcion para manejar el cierre de sesion
  const handleLogOut = async () => {
    console.log("Intentando cerrar sesión");
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleConfirmLogOut = () => {
    console.log("handleConfirmLogOut llamado");
    Alert.alert(
      " Tancar sessió ",
      "Esteu segur que voleu tanca la sessió?",
      [
        {
          text: "Sí",
          onPress: () => {
            handleLogOut();
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const renderContent = () => {
    if (isMapView) {
      return <MapViewComponent />;
    } else {
      return <ListViewComponent data={filteredData} navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {currentUser ? (
        <Navbar
          showGoBack={false}
          showLogIn={false}
          showSearch={true}
          showLogOut={true}
          text="Tancar"
          screen="Login"
          handleSearch={handleSearch}
          handleLogOut={handleConfirmLogOut}
        />
      ) : (
        <Navbar
          showGoBack={false}
          showLogIn={true}
          showSearch={true}
          text="Entrar"
          screen="Login"
          handleSearch={handleSearch}
        />
      )}

      <View style={styles.contentContainer}>
        <SwitchBar isMapView={isMapView} onToggleView={toggleView} />
        <ScrollView style={styles.scrollView}>{renderContent()}</ScrollView>
      </View>
      <FooterNavbar setActiveContent={activeContent} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 120,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
  },
});

export default HomeScreen;
