import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

function Welcome({ navigation }) {
  const loginHandler = () => {
    navigation.navigate("Login")
  }
  const signUpHandler = () => {
    navigation.navigate("SignUp")
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../assets/Fitness_15_logo.png")}/>
      <TouchableOpacity style={styles.optionContainer} onPress={loginHandler}>
        <Text style={styles.option}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={signUpHandler}>
        <Text style={styles.option}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
    backgroundColor: "#58bfe6"
  },
  image: {
    height: 400,
    width: 400,

  },
  option: {
    fontSize: 30,
    paddingVertical: 10,
    color: "black",
  },
  optionContainer: {
    backgroundColor: "#eee",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
})

export default Welcome;