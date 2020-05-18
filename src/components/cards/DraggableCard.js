import React, { useState } from 'react'
import { Animated, PanResponder, TouchableOpacity } from 'react-native'
import CardFront from './CardFront'
import { whatStackWasReleasedOn, valueIsOKforPlacingOntoStack, whatEmptyPositionWasReleasedOn } from '../game/helperFunctions.js'



const DraggableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.unitsAndLocations.unit)
    const [startLocation] = useState(props.startLocation)
    const [animatedDraggable] = useState(new Animated.ValueXY())
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }
    const [updatedLocation, setUpdatedLocation] = useState({ x: 0, y: 0 })
    const [timing] = useState(props.unitsAndLocations.timing)

    const handleReleasedCardSomewhere = (releaseX, releaseY) => {
        const wasReleasedOnStackAndMoveFinalized = cardReleasedOnStackAndValueSuitableAndMoveFinalized(releaseX, releaseY,
            props.unitsAndLocations, props.topmostStuff, props.card, startLocation, animatedDraggable,
            props.handleChangesAfterPlayingACard, props.index, timing)
        if (!wasReleasedOnStackAndMoveFinalized) {
            const wasReleasedOnEmptyPositionAndMoveFinalized = cardReleasedOnEmptyPositionAndMoveFinalized(releaseX, releaseY,
                props.unitsAndLocations, props.occupancyData, animatedDraggable, startLocation, setUpdatedLocation,
                props.handleMovedCardToEmptyPosition, props.index, timing)
            if (!wasReleasedOnEmptyPositionAndMoveFinalized) {
                returnCardToStartDragPosition(animatedDraggable, updatedLocation, timing)
            }
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            moveCardAlongDrag(gestureState.dx, gestureState.dy, animatedDraggable, updatedLocation)
        },
        onPanResponderRelease: (evt, gestureState) => {
            handleReleasedCardSomewhere(gestureState.moveX, gestureState.moveY)
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



// SOME HELPER FUNCTIONS for the component DraggableCard

const getCardStyle = (size) => {
    return {
        width: size,
        height: size * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }
}

const returnCardToStartDragPosition = (animatedDraggable, updatedLocation, timing) => {
    const duration = timing.moveDurationComputerCardGaming
    Animated.timing(animatedDraggable, {
        toValue: {  x: 0 - updatedLocation.x, y: 0 - updatedLocation.y  }, duration: duration,
    }).start()
}

const moveCardAlongDrag = (dx, dy, animatedDraggable, updatedLocation) => {
    Animated.timing(animatedDraggable, {
        toValue: { x: dx - updatedLocation.x, y: dy - updatedLocation.y }, duration: 0,
    }).start()
}

const moveToNewPosition = (animatedDraggable, newPosition, oldPosition, duration) => {
    Animated.timing(animatedDraggable, {
        toValue: { x: newPosition.x - oldPosition.x, y: newPosition.y - oldPosition.y }, duration: duration,
    }).start()
}

const moveCardToGameStack = (animatedDraggable, side, scaleUnit, spacing, startLocation, duration) => {
    const newX =  side === 'left' ? (spacing + (1/6 + 1 + 4/6) * scaleUnit) : (spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit)
    const newY = (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit
    moveToNewPosition(animatedDraggable, { x: newX, y: newY }, startLocation, duration )
}

const moveCardToEmptyPosition = (animatedDraggable, positionIndex, scaleUnit, spacing, startLocation, duration) => {
    const newX = spacing + (1/6 + positionIndex * (1 + 1/6)) * scaleUnit
    const newY = (0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * scaleUnit
    moveToNewPosition(animatedDraggable, { x: newX, y: newY }, startLocation, duration)
}

const cardReleasedOnStackAndValueSuitableAndMoveFinalized = (releaseX, releaseY, unitsAndLocations, topmostStuff, card, startLocation, animatedDraggable, handleChangesAfterPlayingACard, index, timing) => {
    const unit = unitsAndLocations.unit
    const spacing = unitsAndLocations.spacing
    const topmostLeft = topmostStuff.valueLeft
    const topmostRight = topmostStuff.valueRight
    const whatStackCardWasReleasedOn = whatStackWasReleasedOn(releaseX, releaseY, unit, spacing)
    const duration = timing.movementFinalization
    if (whatStackCardWasReleasedOn !== 'none') {
        const valueIsOK = valueIsOKforPlacingOntoStack(whatStackCardWasReleasedOn, topmostLeft, topmostRight, card)
        if (valueIsOK) {
            moveCardToGameStack(animatedDraggable, whatStackCardWasReleasedOn, unit, spacing, startLocation, duration)
            setTimeout(() => {
                handleChangesAfterPlayingACard(index, whatStackCardWasReleasedOn)
            }, duration)
            return true
        }
        return false
    }
}

const cardReleasedOnEmptyPositionAndMoveFinalized = (releaseX, releaseY, unitsAndLocations, occupancyData, animatedDraggable, startLocation, setUpdatedLocation, handleMovedCardToEmptyPosition, index, timing) => {
    const unit = unitsAndLocations.unit
    const spacing = unitsAndLocations.spacing
    const whatEmptyPositionTheCardWasReleasedOn = whatEmptyPositionWasReleasedOn(releaseX, releaseY, unit, spacing, occupancyData)
    const duration = timing.movementFinalization
    if (whatEmptyPositionTheCardWasReleasedOn !== 'none') {
        moveCardToEmptyPosition(animatedDraggable, whatEmptyPositionTheCardWasReleasedOn, unit, spacing, startLocation, duration)
        setTimeout(() => {
            setUpdatedLocation({
                x: (startLocation.x - (spacing + (1/6 + whatEmptyPositionTheCardWasReleasedOn * (1 + 1/6)) * unit)),
                y: (startLocation.y - ((0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * unit)),
            })
            handleMovedCardToEmptyPosition(index, whatEmptyPositionTheCardWasReleasedOn)
        }, duration)
        return true
    }
    return false
}



