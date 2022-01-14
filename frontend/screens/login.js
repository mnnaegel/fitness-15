import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";

function Login({ navigation }) {
  const [users, setUsers] = useState([]);

  axios.get("http://localhost:3000/users").then((resp) => {
    setUsers(resp.data);
  });

  const onSubmit = (value) => {
    const check = users.filter((user) => user.email == value.email);
    if (check.length === 1 && check[0]["password"] === value.password) {
      global.currentUser = check;
      navigation.navigate("Home", navigation.navigate("Home", {
        screen: "Home",
        params: {
          screen: "Home",
          params: check,
        }
    }));
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            style={styles.formInput}
            placeholder="Email"
            type="email"
          />

          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            style={styles.formInput}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Button onPress={handleSubmit} title="Submit" style={styles.button} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
    backgroundColor:"#ECECEC"
  },
  title: {
    fontSize: 40,
    paddingBottom: 20,
  },
  formInput: {
    width: "80%",
    height: "5%",
    borderColor: "#B5B4BC",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default Login;
