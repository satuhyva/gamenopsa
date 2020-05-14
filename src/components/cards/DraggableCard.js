import React, { useState } from 'react'
import { Animated, PanResponder, TouchableOpacity } from 'react-native'
import CardFront from './CardFront'
import { whatStackWasReleasedOn, valueIsOKforPlacingOntoStack, whatEmptyPositionWasReleasedOn } from '../game/helperFunctions.js'


const getCardStyle = (size) => {
    return {
        width: size,
        height: size * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }
}

const returnCardToStartDragPosition = (animatedDraggable, updatedLocation) => {
    Animated.timing(animatedDraggable, {
        toValue: {  x: 0 - updatedLocation.x, y: 0 - updatedLocation.y  }, duration: 500,
    }).start()
}

const moveCardAlongDrag = (dx, dy, animatedDraggable, updatedLocation) => {
    Animated.timing(animatedDraggable, {
        toValue: { x: dx - updatedLocation.x, y: dy - updatedLocation.y }, duration: 0,
    }).start()
}

const moveToNewPosition = (animatedDraggable, newPosition, oldPosition) => {
    Animated.timing(animatedDraggable, {
        toValue: { x: newPosition.x - oldPosition.x, y: newPosition.y - oldPosition.y }, duration: 500,
    }).start()
}

const moveCardToGameStack = (animatedDraggable, side, scaleUnit, spacing, startLocation) => {
    const newX =  side === 'left' ? (spacing + (1/6 + 1 + 4/6) * scaleUnit) : (spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit)
    const newY = (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit
    moveToNewPosition(animatedDraggable, { x: newX, y: newY }, startLocation )
}

const updateGameStackTopmostCard = (side, changeTopmostLeft, changeTopmostRight, card) => {
    if (side === 'left') {
        changeTopmostLeft(card)
    } else {
        changeTopmostRight(card)
    }
}

const moveCardToEmptyPosition = (animatedDraggable, positionIndex, scaleUnit, spacing, startLocation) => {
    const newX = spacing + (1/6 + positionIndex * (1 + 1/6)) * scaleUnit
    const newY = (0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * scaleUnit
    moveToNewPosition(animatedDraggable, { x: newX, y: newY }, startLocation )
}



const DraggableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.size)
    const [startLocation] = useState(props.startLocation)

    // let animatedDraggable = new Animated.ValueXY()
    const [animatedDraggable, setAnimatedDraggable] = useState(new Animated.ValueXY())
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }
    const [updatedLocation, setUpdatedLocation] = useState({ x: 0, y: 0 })
    const [movedToEmpty, setMovedToEmpty] = useState(false)


    const handleReleasedCard = (releaseX, releaseY) => {

        let returnCard = true
        // dealing with possible release of card on either of the middle game stacks
        const whatStackCardWasReleasedOn = whatStackWasReleasedOn(releaseX, releaseY, props.size, props.spacing)
        if (whatStackCardWasReleasedOn !== 'none') {
            const valueIsOK = valueIsOKforPlacingOntoStack(whatStackCardWasReleasedOn, props.topmostLeft, props.topmostRight, props.card)
            if (valueIsOK) {
                returnCard = false
                moveCardToGameStack(animatedDraggable, whatStackCardWasReleasedOn, props.size, props.spacing, props.startLocation)
                setTimeout(() => {
                    updateGameStackTopmostCard(whatStackCardWasReleasedOn, props.changeTopmostLeft, props.changeTopmostRight, props.card)
                    props.convertCardState('null')
                    props.setPlayerCardToPlayed(props.index)
                    if (!movedToEmpty) {
                        props.flipPossibleCardBelow(props.index)
                    }
                }, 500)
            }
        }

        // dealing with possible release of card on an empty position in the solitaire
        const whatEmptyPositionTheCardWasReleasedOn = whatEmptyPositionWasReleasedOn(releaseX, releaseY, props.size, props.spacing, props.emptyPositions)
        if (whatEmptyPositionTheCardWasReleasedOn !== 'none' && !movedToEmpty) {
            moveCardToEmptyPosition(animatedDraggable, whatEmptyPositionTheCardWasReleasedOn, props.size, props.spacing, props.startLocation)
            setTimeout(() => {
                returnCard = false
                setMovedToEmpty(true)
                setUpdatedLocation({
                    x: startLocation.x - (props.spacing + (1/6 + whatEmptyPositionTheCardWasReleasedOn * (1 + 1/6)) * props.size),
                    y: startLocation.y - ((0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * props.size),
                })
                props.flipPossibleCardBelow(props.index)
            }, 500)
            return
        }

        // otherwise return the card to original position
        if (returnCard) {
            returnCardToStartDragPosition(animatedDraggable, updatedLocation)
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            moveCardAlongDrag(gestureState.dx, gestureState.dy, animatedDraggable, updatedLocation)
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



