import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"

function Help({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <View style={styles.section}>
        <View>
          <Text style={styles.option}>Report a Problem</Text>
        </View>
        <View style={styles.end}>
        <Text style={styles.next}>></Text>
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.section}>
        <View>
          <Text style={styles.option}>Help Center</Text>
        </View>
        <View style={styles.end}>
        <Text style={styles.next}>></Text>
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.section}>
        <View>
          <Text style={styles.option}>Support Requests</Text>
        </View>
        <View style={styles.end}>
        <Text style={styles.next}>></Text>
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.section}>
        <View>
          <Text style={styles.option}>Privacy and Security Help</Text>
        </View>
        <View style={styles.end}>
        <Text style={styles.next}>></Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: "#ECECEC"
  },
  end: {
    flex: 1,
  },
  next: {
    textAlign: "right",
    marginRight: 20,
    fontSize: 20,
  },
  option: {
    fontSize: 20,

  },
  section: {
    flexDirection: "row",
    marginBottom: 40,
  }
  
  
})

export default Help;