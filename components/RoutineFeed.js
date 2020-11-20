import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore'





function RoutineFeed() {

    useEffect(() => {
        firestore()
            .collection('users1')
            .doc('initial')
            .collection('created-routines')
            // .doc('bench-day')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    console.log(doc.data(), 'data')
                })
            })
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