import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

const TabOneScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('../../assets/images/logo2.png')}
      />
      <Text style={styles.title}>Welcome to Amateeth!</Text>
      <Text style={styles.slogan}>Sparkling Strong Teeth...</Text>
      <Text style={styles.slogan}>...All day! Everyday!</Text>      
      <Link href="/two" style={styles.button}>Register Patient</Link>
      <Link href="/three" style={styles.button2}>Add Record</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffda03",
    //alignItems: "center",
    //justifyContent: "center",
  },
  title: {
    color: "#040406",
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "courier",
    fontSize: 30,
    top: 70,
    padding: 21,
    alignSelf: "center",
  },
  slogan: {
    color: "#040406",
    fontStyle: "italic",
    fontFamily: "futura",
    fontWeight: "600",
    top: 50, 
    fontSize: 16,
    padding: 5,
    alignSelf: "center",
  },
  text: {
    color: "#040406",
    fontStyle: "italic",
    fontWeight: "500",
    fontSize: 20,
    padding: 6,
    alignItems: "center",
  },
  logo: {
    alignSelf: 'center',
    transform: [{scale: 0.9}],
    top: 75, 
    width: 200,
    height: 160,
    margin:9,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: "#040406",
    padding: 10,
    color: "#ffda03",
    top: 105,
    alignSelf: "center",    
  },
  button2: {
    backgroundColor: "#040406",
    padding: 10,
    color: "#ffda03",
    top: 145,
    alignSelf: "center",
  },
  buttonShape: {
    borderRadius: 40,
  },
  
});

export default TabOneScreen;
