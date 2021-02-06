import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Alert, StyleSheet, TextInput } from 'react-native'

import auth from '@react-native-firebase/auth'

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(cred => {
                console.log(cred)
                navigation.navigate('RoutineFeed')
            })
            .catch(err => {
                console.log(err, 'error')
            })
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