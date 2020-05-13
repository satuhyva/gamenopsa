import React from 'react'
import { View } from 'react-native'
import CardFront from '../cards/CardFront'


const getCardViewStyleLeft = (scaleUnit, spacing) => {
    return {
        position: 'absolute',
        left: spacing + (1/6 + 1 + 4/6) * scaleUnit,
        top: (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit,
        width: scaleUnit,
        height: 1.7 * scaleUnit,
        borderRadius: 7,
        zIndex: 0,
    }
}

const getCardViewStyleRight = (scaleUnit, spacing) => {
    return {
        position: 'absolute',
        left: spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit,
        top: (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit,
        width: scaleUnit,
        height: 1.7 * scaleUnit,
        borderRadius: 7,
        zIndex: 0,
    }
}


const GameStack = ({ viewStyle, topmost }) => {
    const background = topmost === '' ? 'green' : 'papayawhip'
    return (
        <View style={[viewStyle, { backgroundColor: background }]}>
            {topmost !== '' ?
                <CardFront card={topmost}/>
                :
                null
            }
        </View>
    )
}

const CommonGameStacks = ({ topmostLeft, topmostRight,  scaleUnit, spacing }) => {

    const cardViewStyleLeft = getCardViewStyleLeft(scaleUnit, spacing)
    const cardViewStyleRight = getCardViewStyleRight(scaleUnit, spacing)

    return (
        <View>
            <GameStack
                viewStyle={cardViewStyleLeft}
                topmost={topmostLeft}
            />
            <GameStack
                viewStyle={cardViewStyleRight}
                topmost={topmostRight}
            />
        </View>
    )
}

export default CommonGameStacks

