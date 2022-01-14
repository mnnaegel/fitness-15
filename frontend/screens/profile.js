import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";

function MyAccount({ navigation }) {
  const logoutHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("./../assets/defaultProfile.png")}
      />
      <Text style={styles.attribute}>
        Name:{" "}
        {global.currentUser[0]["firstName"] +
          " " +
          global.currentUser[0]["lastName"]}
      </Text>
      <Text style={styles.attribute}>
        Email: {global.currentUser[0]["email"]}{" "}
      </Text>
      <Text style={styles.attribute}>
        Phone Number: {global.currentUser[0]["phone"]}{" "}
      </Text>
      <TouchableOpacity onPress={logoutHandler}>
        <Text style={styles.touchable}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.sportTitleContainer}>
        <Text style={styles.sportTitle}>Sports</Text>
      </View>
      <FlatList
        style={styles.list}
        data={global.currentUser[0]["sport"]}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  attribute: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "#5DA2D5",
    width: "90%",
    color: "white",
    paddingVertical: 10,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 20,
    backgroundColor: "#ECECEC",
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
    color: "#464866",
    fontWeight: "bold",
  },
  sportTitleContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    width: "90%",
  },
  touchable: {
    fontSize: 20,
    color: "#25274D",
    textAlign: "center",
    paddingRight: 30,
  },
});

export default MyAccount;
