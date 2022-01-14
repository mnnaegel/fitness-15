import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <SafeAreaView>
        <Text style={styles.title}>Fitness 15</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "12%",
    backgroundColor: "#bdbdbd",
  },
  title: {
    textAlign: "left",
    paddingLeft: "10%",
    paddingTop: "2%",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  user: {
    alignSelf: "flex-end",
  },
});
