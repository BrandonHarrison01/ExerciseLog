import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'

import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitCreds = async () => {
        const res = await auth().signInWithEmailAndPassword(email, password)
        await AsyncStorage.setItem('uid', res.user.uid)
        navigation.navigate('RoutineFeed')
        // console.log(res.user.uid, 'res')
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