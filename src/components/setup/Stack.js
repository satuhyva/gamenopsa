import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import CardBack from '../cards/CardBack'

const Stack = ({ displayColor, number, selectStack, scaleUnit }) => {

    const stackStyle = {
        width: scaleUnit * 1.5,
        height: scaleUnit * 1.7 * 1.3,
        borderRadius: 7 * 1.3,
        borderWidth: 1.3,
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <TouchableOpacity onPress={() => selectStack(number)}>
            <View style={[stackStyle, displayColor]}>
                <CardBack scaleUnit={scaleUnit}/>
            </View>
        </TouchableOpacity>
    )
}

export default Stack

