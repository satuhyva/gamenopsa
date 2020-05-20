import React from 'react'
import { View } from 'react-native'
import CardFront from '../cards/CardFront'


const getCardViewStyle = (side, unitsAndLocations) => {
    let commonStyles = {
        position: 'absolute',
        width: unitsAndLocations.unit,
        height: 1.7 * unitsAndLocations.unit,
        borderRadius: 7,
        zIndex: 0,
    }
    if (side === 'left') {
        return { ...commonStyles,
            left: unitsAndLocations.leftGamingStackXY.x,
            top: unitsAndLocations.leftGamingStackXY.y,
        }
    } else {
        return { ...commonStyles,
            left: unitsAndLocations.rightGamingStackXY.x,
            top: unitsAndLocations.rightGamingStackXY.y,
        }
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

const CommonGameStacks = ({ topmostLeft, topmostRight, unitsAndLocations, roundIsOver }) => {

    if (roundIsOver) {
        return null
    }

    const cardViewStyleLeft = getCardViewStyle('left', unitsAndLocations)
    const cardViewStyleRight = getCardViewStyle('right', unitsAndLocations)

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

