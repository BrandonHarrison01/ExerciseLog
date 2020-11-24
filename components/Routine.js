import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, AsyncStorage, View } from 'react-native'

import firestore from '@react-native-firebase/firestore';

function Routine(props) {
    const [routine, setRoutine] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const document = await AsyncStorage.getItem("document")
            const routine = await firestore()
              .collection('users1')
              .doc('initial')
              .collection('created-routines')
              .doc(document)
              .get()
              setRoutine(routine.data())
        };
        fetchData()
    },[]);

    return(
        <View>
            {routine && <Text>{routine.document}</Text>}
        </View>
    )
}

export default Routine