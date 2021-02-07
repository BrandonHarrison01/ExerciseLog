import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Alert, StyleSheet, TextInput } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async () => {
        try {
            const cred = await auth().createUserWithEmailAndPassword(email, password)
            const res = firestore().collection('users1').doc(cred.user.uid).set({empty: 'object'})
            console.log(res, 'res')
        } catch(err) {
            console.log(err, 'error')
        }
        // if(res){
        //     navigation.navigate('RoutineFeed')
        // }
    }

    return(
        <View>
            <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity style={styles.emailButton} onPress={onSubmit}>
                <Text>Submit</Text>
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

export default Login