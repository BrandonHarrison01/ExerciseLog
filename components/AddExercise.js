import React from 'react'
import { View, Text, TextInput} from 'react-native'

function AddExercise() {
    return (
        <View>
            <Text>Add Exercise</Text>
            <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
                <Text style={{marginLeft: 20}}>REQUIRED</Text>
            </View>
            <Text>TITLE:</Text>
            <TextInput />
            <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
                <Text style={{marginLeft: 20}}>REQUIRED</Text>
            </View>
        </View>
    )
}

export default AddExercise