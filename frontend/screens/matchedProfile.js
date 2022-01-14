import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image} from "react-native"

function MyAccount({ navigation, route }) {
  const match = route.params

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../assets/defaultProfile.png")}/>
      <Text style={styles.attribute}>Name: {match["firstName"] + " " + match["lastName"]}</Text>
      <Text style={styles.attribute}>Email: {match["email"]}</Text>
      <Text style={styles.attribute}>Phone Number: {match["phone"]} </Text>
      <View style={styles.sportTitleContainer}>
        <Text style={styles.sportTitle}>Sports in Common</Text>
      </View>
      <FlatList
        style={styles.list}
        data={match["sport"]}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text>
        )}
      />
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  attribute: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "#5DA2D5",
    width: "87%",
    color: "white",
    
    paddingVertical: 10,
    paddingLeft: 20,

  },
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 20,
    backgroundColor: "#ECECEC"
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: "center",
    marginRight: 30,
    marginTop: 5,
  },
  list: {
    width: "90%",
    flexDirection: "column",
  },
  item: {
    fontSize: 20,
    marginRight: 10,
    color: "white",
    backgroundColor: "#90CCF4",
    paddingLeft: 10,
    paddingVertical: 10,
    marginBottom: 20,

  },
  sportTitle: {
    fontSize: 20,
    color: "#25274d",
    fontWeight: "bold",

  },
  sportTitleContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomColor: "#25274D",
    borderBottomWidth: 1,
    width: "90%"
  },
})

export default MyAccount;