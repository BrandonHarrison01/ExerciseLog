import React from 'react'
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native'

function Login() {
    return(
        <View>
            <TouchableOpacity style={styles.emailButton} onPress={() => Alert.alert('pressed')}>
                <Text>Email</Text>
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