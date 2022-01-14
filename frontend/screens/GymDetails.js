import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"

const GymDetails = ({route, navigation}) => {
    const gymData = route.params
    console.log(gymData)
    return (  
      <View style={styles.container}>
        <View style={styles.gymTitleContainer}>
        <Text style={styles.gymTitle}>{gymData["name"]}</Text>
        </View>
        <Text style={styles.item}>{gymData["vicinity"]}</Text>
        <Text style={styles.item}>Rating: {gymData["rating"]}/5</Text>
        <Text style={styles.item}>#ofReviews: {gymData["user_ratings_total"]}</Text>
      </View>
    );
}

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
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    paddingLeft: 30,
  },
  item: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "#90CCF4",
    color: "white",
    paddingVertical: 10,
    paddingLeft: 20,
    width: "80%",
  },
  gymTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 20,
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
  },
  gymTitleContainer: {
    marginBottom: 20,

    borderBottomColor: "#25274D",
    borderBottomWidth: 1,
    width: "90%",
  },
})
export default GymDetails;