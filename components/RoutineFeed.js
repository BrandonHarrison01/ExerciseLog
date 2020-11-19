import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore'





function RoutineFeed() {

    useEffect(() => {
        const a = async () => {
            const users = await firestore()
                .collection('users1')
                .get()
    
            console.log(users, 'users')
        }
    
        a()
    }, [])
    
    return(
        <View>
            <Text>
                Feed Screen
            </Text>
        </View>
    )
}

export default RoutineFeed