import React from 'react'
import { View, Text, TextInput } from 'react-native'

function RoutineExercise({ route }) {
    return(
        <View>
            <Text>{route.params.title}</Text>
            <View>
                <TextInput placeholder={route.params.sets.toString()} />
                <Text>X</Text>
                <TextInput placeholder={route.params.reps.toString()} />
                <Text>OF</Text>
                <TextInput placeholder={route.params.weight.toString()} />
                <Text>LBS</Text>
            </View>
        </View>
    )
}

export default RoutineExercise