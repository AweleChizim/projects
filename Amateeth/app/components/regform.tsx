import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default class RegForm extends React.Component {
    render(): React.ReactNode {
        return (
            <View style={styles.regform}>
                <TextInput style={styles.textinput} placeholder="First Name" placeholderTextColor={"#FFD700"}/>
                <TextInput style={styles.textinput} placeholder="Last Name" placeholderTextColor={"#FFD700"}/>
                <TextInput style={styles.textinput} placeholder="Middle Name" placeholderTextColor={"#FFD700"}/>
                <TextInput style={styles.textinput} placeholder="Date of Birth (dd-mm-yyyy)" placeholderTextColor={"#FFD700"}/>
                <TextInput style={styles.textinput} placeholder="Home Address" placeholderTextColor={"#FFD700"}/>
                <TextInput style={styles.textinput} placeholder="Date of Registration (dd-mm-yyyy)" placeholderTextColor={"#FFD700"}/>
                <TextInput style={styles.textinput} placeholder="NIN" placeholderTextColor={"#FFD700"}/>
            
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: "stretch",
        color: "#000000",
    },
    textinput: {
        alignSelf: "stretch",
        color: "#000",
        height: 40,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        borderTopColor: "#000000",
        borderTopWidth: 0.5,
        borderBottomColor: "#000000",
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        textDecorationColor: "#ffda04",
    },
    button: {
        alignSelf: "stretch",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#000000",
        marginTop: 30,
        marginLeft: 135,
        marginRight: 135,
    },
    btntext: {
        color: "#ffda04",
        fontWeight: "bold",
    },
})