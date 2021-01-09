import React from 'react'
import { View, Text } from 'react-native'

import Svg, { Path, Polyline } from 'react-native-svg'

function Graph({ exercise }) {
    console.log(exercise, 'es')
    const line = exercise && `0,${exercise[0]} 350,${exercise[2]}`
    return(
        <View style={{ margin: 10, borderColor: 'red', borderWidth: 2 }}>
            <Svg height="200" width="350">
                <Polyline
                    points={line && line}
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                />
                <Polyline
                    points="0,175 25,125 50,75 75,20 95,5 350,5"
                    fill="none"
                    stroke="blue"
                    strokeWidth="3"
                />
            </Svg>
        </View>
    )
}

export default Graph