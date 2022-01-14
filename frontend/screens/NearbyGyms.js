import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Location from "expo-location";

const NearbyGyms = ({ navigation }) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const [displayLocalGyms, setDisplayLocalGyms] = useState([
    { name: "Waiting for API..." },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  var gymData = {};
  function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  function getGymData(responseText) {
    gymData = JSON.parse(responseText);
    let nearbyGyms = [];
    for (let i = 0; i < 5; i++) {
      nearbyGyms.push(gymData["results"][i]);
    }
    setDisplayLocalGyms(nearbyGyms);
    console.log(displayLocalGyms);
    setIsLoggedIn(true);
  }
  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA0fGjHA7DqqORQt62lE59MK3HPMM6SQNo&location=${latitude},${longitude}&radius=5000&type=gym`;
      httpGetAsync(url, getGymData);
    }
  };

  const gymDescHandler = (item) => {
    navigation.navigate("GymDetails", item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Local Gyms:</Text>
      </View>
      {isLoggedIn && (
        <FlatList
          data={displayLocalGyms}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => gymDescHandler(item)}>
              <Text style={styles.text}>{item["name"]}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    alignItems: "center",
    paddingTop: 130,
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FD0139",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
});

export default NearbyGyms;
