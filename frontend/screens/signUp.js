import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  sport: Yup.string().required("Required"),
});

function SignUp({ navigation }) {
  const onSubmit = (values) => {
    values.sport = values.sport.toLowerCase().replace(/ /g, "").split(",");
    console.log(values);
    axios.post("http://localhost:3000/users", values);
    navigation.navigate("Login");
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: 9,
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={formSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
            style={styles.formInput}
            placeholder="First Name"
          />
          <TextInput
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            style={styles.formInput}
            placeholder="Last Name"
          />
          <TextInput
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            value={values.phone}
            style={styles.formInput}
            placeholder="Phone number"
          />
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
          <TextInput
            onChangeText={handleChange("sport")}
            onBlur={handleBlur("sport")}
            value={values.sport}
            style={styles.formInput}
            placeholder="Enter sports seperated by commas"
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
    justifyContent: "center",
    alignItems: "center",
  },
  formInput: {
    width: "80%",
    height: "5%",
    borderColor: "#B5B4BC",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    borderColor: "#B5B4BC",
    borderWidth: 3,
  },
});

export default SignUp;
