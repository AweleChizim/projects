import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default function RecForm() {    
    // const [value, setValue] = useState("");
    // const clearTextEntry = (value: string) => {
    //     setValue(value);
    // }

    return (
        <View style={styles.recform}>
            <TextInput style={styles.textinput} placeholder="Date Of Clinic Visit (dd-mm-yyyy)" placeholderTextColor={"#FFD700"}/>
            <TextInput style={styles.textinput} placeholder="Nature of Ailment" placeholderTextColor={"#FFD700"}/>
            <TextInput style={styles.textinput} placeholder="Medicine Prescribed" placeholderTextColor={"#FFD700"}/>
            <TextInput style={styles.textinput} placeholder="Proceedure Undertaken" placeholderTextColor={"#FFD700"}/>
            <TextInput style={styles.textinput} placeholder="Next Appointment Date (dd-mm-yyyy)" placeholderTextColor={"#FFD700"}/>
        
            <TouchableOpacity style={styles.button}>
                <Text style={styles.btntext}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    recform: {
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