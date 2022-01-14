import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"

function ConnectMe({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ConnectMe Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
  },
  title: {
    fontSize: 40,
    paddingBottom: 20,
  },
})

export default ConnectMe;