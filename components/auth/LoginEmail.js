import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'

import auth from '@react-native-firebase/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitCreds = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(res => console.log(res, 'res'))
            .catch(err => console.log(err, 'err'))
    }

    return(
        <View>
            <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={text => setPassword(text)} />
            <TouchableOpacity onPress={submitCreds}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login