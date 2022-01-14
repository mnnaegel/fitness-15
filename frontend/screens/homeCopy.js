import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

function Home({ navigation, route }) {
  const [locations, setLocations] = useState([
    {location: "123 Lesley Ave", key: "1"},
    {location: "124 Bayview Ave", key: "2"},
    {location: "125 Kennedy Ave", key: "3"},
    {location: "126 Young Ave", key: "4"},
    {location: "127 John Ave", key: "5"},
  ])
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
      <FlatList 
        style={styles.list}
        data={locations}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.location}</Text>
        )
        }
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    paddingVertical: 30,
    paddingHorizontal: 35, 
    fontWeight: "bold",  
  },
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#58bfe6",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "pink",
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingLeft: 20,
  },
  gymTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  gymTitleContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    width: "90%"
  },
  image: {
    height: 200,
    width: 350,
    borderWidth: 1,
    marginBottom: 100,
  },
  list: {
    alignSelf: "flex-start",
    marginLeft: 30,
    width: "85%",

  },
  touchable: {
    position: "absolute",
    top: 200,
    left: 50,
    backgroundColor: "orange",
    borderRadius: 20,
  }
})