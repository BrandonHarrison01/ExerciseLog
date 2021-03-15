import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Alert, StyleSheet, TextInput } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

function RegisterEmail({ navigation }) {
    const [email, setEmail] = useState('')
    const [passwordA, setPasswordA] = useState('')
    const [passwordB, setPasswordB] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)

    const userConfig = {
        dayStreak: 0,
        daysLogged: {},
        longestStreak: 0,
        totalWeight: 0
    }

    const onSubmit = async () => {
        if(passwordA === passwordB){
            try {
                const cred = await auth().createUserWithEmailAndPassword(email, passwordA)
                const res = await firestore().collection('users1').doc(cred.user.uid).collection('stats').doc('lifetimeTotal').set(userConfig)
                navigation.navigate('RoutineFeed')
            } catch(err) {
                console.log(err, 'error')
            }
        } else {
            setPasswordMatch(false)
        }
    }

    return(
        <View>
            <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPasswordA(text)} />
            { !passwordMatch && <Text style={{ color: "red" }} >passwords don't match bitch</Text>}
            <TextInput placeholder='Confirm Password' secureTextEntry={true} onChangeText={(text) => setPasswordB(text)} />
            <TouchableOpacity style={styles.emailButton} onPress={onSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate("LoginEmail")} >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    emailButton: {
        alignItems: 'center',
        marginTop: 300,
        padding: 10,
        backgroundColor: 'gainsboro'
    }
})

export default RegisterEmail