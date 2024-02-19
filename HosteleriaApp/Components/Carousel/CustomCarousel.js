import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";

const Dot = ({ isActive }) => (
  <View
    style={[styles.dot, isActive ? styles.activeDot : styles.inactiveDot]}
  />
);

const CustomCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) {
        nextIndex = 0;
      }
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, screenWidth]);

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ ...styles.carouselContainer, width: screenWidth }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.imageUrl }}
            style={{ ...styles.image, width: screenWidth }}
          />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <Dot key={index} isActive={index === currentIndex} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    // La propiedad width se define dinámicamente en el componente
  },
  image: {
    height: 200,
    resizeMode: "cover",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  textIndicator: {
    color: "#000",
    fontSize: 16,
    marginHorizontal: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "black",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});

export default CustomCarousel;
