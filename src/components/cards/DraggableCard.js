import React, { useState } from 'react'
import { Animated, PanResponder, TouchableOpacity } from 'react-native'
import CardFront from './CardFront'
import { whatStackWasReleasedOn, valueIsOKforPlacingOntoStack } from '../game/helperFunctions.js'


const getCardStyle = (size) => {
    return {
        width: size,
        height: size * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }
}

const returnCardToStartDragPosition = (animatedDraggable) => {
    Animated.timing(animatedDraggable, {
        toValue: { x: 0, y: 0 }, duration: 500,
    }).start()
}

const moveCardAlongDrag = (dx, dy, animatedDraggable) => {
    Animated.timing(animatedDraggable, {
        toValue: { x: dx, y: dy }, duration: 0,
    }).start()
}


const moveCardToGameStack = (animatedDraggable, side, scaleUnit, spacing, startLocation) => {
    const newX =  side === 'left' ? (spacing + (1/6 + 1 + 4/6) * scaleUnit) : (spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit)
    const newY = (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit
    Animated.timing(animatedDraggable, {
        toValue: { x: newX - startLocation.x, y: newY - startLocation.y }, duration: 500,
    }).start()
}

const updateGameStack = (side, changeTopmostLeft, changeTopmostRight, card) => {
    if (side === 'left') {
        changeTopmostLeft(card)
    } else {
        changeTopmostRight(card)
    }
}



const DraggableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.size)
    const [startLocation] = useState(props.startLocation)

    let animatedDraggable = new Animated.ValueXY()
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }


    const handleReleasedCard = (releaseX, releaseY) => {
        const whatStackCardWasReleasedOn = whatStackWasReleasedOn(releaseX, releaseY, props.size, props.spacing)
        if (whatStackCardWasReleasedOn !== 'none') {
            const valueIsOK = valueIsOKforPlacingOntoStack(whatStackCardWasReleasedOn, props.topmostLeft, props.topmostRight, props.card)
            if (valueIsOK) {
                moveCardToGameStack(animatedDraggable, whatStackCardWasReleasedOn, props.size, props.spacing, props.startLocation)
                setTimeout(() => {
                    updateGameStack(whatStackCardWasReleasedOn, props.changeTopmostLeft, props.changeTopmostRight, props.card)
                    props.convertCardState('null')
                    props.flipPossibleCardBelow(props.index)
                }, 500)
            } else {
                returnCardToStartDragPosition(animatedDraggable)
            }
        } else {
            returnCardToStartDragPosition(animatedDraggable)
        }

        // const wasReleasedOnRight = wasReleasedOnRightGamingPack(releaseX, releaseY, unitWidth, bufferLeft)
        // const valueOkForRight = valueIsSuitable(topmostGamingRight.value, card.value)
        // if (wasReleasedOnRight && valueOkForRight) {
        //     moveCardOntoRightGamePack(releaseX, releaseY)
        //     setTimeout(() => {
        //         props.updateRightGamingPack(index)
        //     }, 500)
        // } else {
        // }

    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            moveCardAlongDrag(gestureState.dx, gestureState.dy, animatedDraggable)
        },
        onPanResponderRelease: (evt, gestureState) => {
            handleReleasedCard(gestureState.moveX, gestureState.moveY)
        },
    })


    return (
        <TouchableOpacity  disabled={false}>
            <Animated.View style={[cardStyle, dragStyle, { position: 'absolute', left: startLocation.x, top: startLocation.y }]} {...panResponder.panHandlers} >
                <CardFront card={props.card}/>
            </Animated.View>
        </TouchableOpacity>
    )
})

export default DraggableCard



