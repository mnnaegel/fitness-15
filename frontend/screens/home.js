import axios from "axios";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, FlatList} from 'react-native';
import * as Location from 'expo-location';

function Home({ navigation, route }) {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const [displayLocalGyms, setDisplayLocalGyms] = useState(
    [{name: "Waiting for API..."}]
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  var gymData = {}
  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText)
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous 
      xmlHttp.send(null);
  }


  function getGymData(responseText)
  {
    gymData = JSON.parse(responseText);
    let nearbyGyms = []
    for(let i=0; i<6;i++){
      nearbyGyms.push(gymData['results'][i])
    }
    setDisplayLocalGyms(nearbyGyms)
    console.log(displayLocalGyms)
    setIsLoggedIn(true);
  }
  const GetCurrentLocation = async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA0fGjHA7DqqORQt62lE59MK3HPMM6SQNo&location=${latitude},${longitude}&radius=5000&type=gym`
      httpGetAsync(url, getGymData)
    }
  };

  const gymDescHandler = (item) => {
    navigation.navigate("GymDetails", item)
  }
  const [users, setUsers] = useState([]);

  axios.get("http://localhost:3000/users").then((resp) => {
    setUsers(resp.data);
  });
  
  function isSame(user1, user2){
    for(let i=0; i<user1["sport"].length; i++){
        for(let j=0; j<user2["sport"].length; j++){
            if(user1["_id"]!=user2["_id"] && user1["sport"][i] == user2["sport"][j]){
                return user2
            }
        }
    }
    return null
  }

  function findPartner(user){
    let result = null;
    for(const match in users){
      result = isSame(user,users[match])
      if (result) break;
    }
    return result;
  }
  
  const pressHandler = () => {
    const user = route.params
    const match = findPartner(user['0']);
    navigation.navigate("MatchedProfile", match)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image}source={require("./../assets/people_working_out.jpg")}/>
      <TouchableOpacity onPress={pressHandler} style={styles.touchable}>
        <Text style={styles.button}>Connect Me!</Text>
      </TouchableOpacity>
        <View style={styles.gymTitleContainer}>
        <Text style={styles.gymTitle}>Gyms Near Me</Text>
      </View>
      {isLoggedIn &&
      <FlatList
        data={displayLocalGyms}
        renderItem={({item})=>( 
          <TouchableOpacity style={styles.itemContainer} onPress={()=>gymDescHandler(item)}>
            <Text style={styles.item}>
              {item["name"]}
            </Text>
          </TouchableOpacity>
        )}
      />
      }
    </View>
    );
  }

  const styles = StyleSheet.create({
    button: {
      fontSize: 40,
      paddingVertical: 30,
      paddingHorizontal: 35, 
      fontWeight: "bold", 
      backgroundColor:"#5DA2D5" ,
      borderColor:"#25274D",
      color:"white"
      
    
    },
    container: {
      paddingTop: 30,
      flex: 1,
      backgroundColor: "#ECECEC",
      alignItems: "center",
      justifyContent: "center"
    },
    item: {
      fontSize: 20,
      marginBottom: 20,
      backgroundColor: "#90CCF4",
      color: "white",
      paddingVertical: 10,
      paddingLeft: 20,
    },
    itemContainer: {
      width: "95%",
      marginRight:50
    },
    gymTitle: {
      fontSize: 20,
      color: "#333",
      fontWeight: "bold",
      paddingLeft: 10,
    },
    gymTitleContainer: {
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomColor: "#25274D",
      borderBottomWidth: 1,
      width: "90%"
    },
    image: {
      height: 200,
      width: 350,
      borderWidth: 1,
      marginBottom: 60,
      marginTop: 50,
      borderColor:"#25274D"
    },
    list: {
      alignSelf: "flex-start",
      marginLeft: 30,
      width: "85%",
    },
    touchable: {
      position: "absolute",
      top: 210,
      left: 60,
      backgroundColor: "orange",
      borderRadius: 20,
    }
  })

export default Home;
