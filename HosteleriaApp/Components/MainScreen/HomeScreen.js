import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapViewComponent from "./MapView";
import ListViewComponent from "./ListView";
import SwitchBar from "./SwitchBar";
import Navbar from "../Navbar/Navbar";
import FooterNavbar from "../FooterNavbar/FooterNavbar";
import ProfileScreen from "../Profile/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { db } from "../FirebaseConfig";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function HomeScreen() {
  const [filteredData, setFilteredData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [isMapView, setIsMapView] = useState(false);
  const [activeButton, setActiveButton] = useState("Home");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigation = useNavigation();

  // Función para obtener los datos de los restaurantes
  const fetchRestaurantsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Restaurant"));
      const restaurants = [];
      querySnapshot.forEach((doc) => {
        const restaurantData = {
          id: doc.id,
          ...doc.data(),
          workers: [], // Preparamos para llenar con datos de los alumnos
        };
        restaurants.push(restaurantData);
      });
      setRestaurantsData(restaurants);
    } catch (error) {
      console.error("Error al obtener los datos de los restaurantes", error);
    }
  };

  // Función para obtener los alumnos del restaurante
  const fetchWorkersData = async (restaurantId) => {
    try {
      const workersQuery = query(
        collection(db, "Restaurant", restaurantId, "alumnes"),
        limit(3)
      );
      const querySnapshot = await getDocs(workersQuery);
      const workers = [];
      querySnapshot.forEach((doc) => {
        workers.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return workers;
    } catch (error) {
      console.error("Error al obtener los datos de los alumnos: ", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchRestaurantsData();
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchAndSetWorkers = async () => {
      // Solo procede si hay datos de restaurantes para procesar.
      if (restaurantsData.length > 0) {
        const promises = restaurantsData.map(async (restaurant) => {
          const workers = await fetchWorkersData(restaurant.id);
          return { ...restaurant, workers }; // Retorna el restaurante con los trabajadores.
        });
        const updatedRestaurantsData = await Promise.all(promises);
        setFilteredData(updatedRestaurantsData);
      }
    };

    fetchAndSetWorkers();
  }, [restaurantsData]);

  const toggleView = () => {
    setIsMapView(!isMapView);
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    // Desuscribirse al desmontar
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Llama a fetchRestaurantsData aquí para cargar los datos al iniciar
    fetchRestaurantsData();
  }, []);

  const handleProfilePress = () => {
    if (isUserLoggedIn) {
      // Si el usuario está autenticado, establece el estado para mostrar la pantalla de perfil
      setShowProfile(true);
    } else {
      // Si el usuario no está autenticado, navega a la pantalla de inicio de sesión
      navigation.navigate("Login");
    }
  };

  const renderContent = () => {
    if (isMapView) {
      return <MapViewComponent />;
    } else if (activeButton === "Home" && showProfile) {
      return (
        <ProfileScreen
          isUserLoggedIn={isUserLoggedIn}
          navigation={navigation}
        />
      );
    } else if (activeButton === "Home") {
      return <ListViewComponent data={filteredData} navigation={navigation} />;
    } else if (activeButton === "Profile") {
      return (
        <ProfileScreen
          isUserLoggedIn={isUserLoggedIn}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Navbar
        showGoBack={false}
        showLogIn={true}
        showSearch={true}
        text="Login"
        screen="Login"
      />

      <View style={styles.contentContainer}>
        {activeButton !== "Profile" && activeButton !== "Favorite" && (
          <SwitchBar isMapView={isMapView} onToggleView={toggleView} />
        )}
        <ScrollView style={styles.scrollView}>{renderContent()}</ScrollView>
      </View>

      <FooterNavbar
        setActiveContent={setActiveButton}
        isUserLoggedIn={isUserLoggedIn}
        navigation={navigation}
        setShowProfile={setShowProfile}
      />
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
