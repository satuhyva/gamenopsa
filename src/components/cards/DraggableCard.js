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


const moveCardToEmptyPosition = (animatedDraggable, positionIndex, scaleUnit, spacing, startLocation) => {
    const newX = spacing + (1/6 + positionIndex * (1 + 1/6)) * scaleUnit
    const newY = (0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * scaleUnit
    moveToNewPosition(animatedDraggable, { x: newX, y: newY }, startLocation )
}




const DraggableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.unitsAndLocations.unit)
    const [startLocation] = useState(props.startLocation)
    const [animatedDraggable] = useState(new Animated.ValueXY())
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }
    const [updatedLocation, setUpdatedLocation] = useState({ x: 0, y: 0 })


    const handleReleasedCard = (releaseX, releaseY) => {

        let returnCard = true

        const whatStackCardWasReleasedOn = whatStackWasReleasedOn(releaseX, releaseY, props.unitsAndLocations.unit, props.unitsAndLocations.spacing)
        if (whatStackCardWasReleasedOn !== 'none') {
            const valueIsOK = valueIsOKforPlacingOntoStack(whatStackCardWasReleasedOn, props.topmostStuff.valueLeft, props.topmostStuff.valueRight, props.card)
            if (valueIsOK) {
                returnCard = false
                moveCardToGameStack(animatedDraggable, whatStackCardWasReleasedOn, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.startLocation)
                setTimeout(() => {
                    props.handleChangesAfterPlayingACard(props.index, whatStackCardWasReleasedOn)
                }, 500)
            }
        }

        const whatEmptyPositionTheCardWasReleasedOn = whatEmptyPositionWasReleasedOn(releaseX, releaseY, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.occupancyData)
        if (whatEmptyPositionTheCardWasReleasedOn !== 'none') {
            moveCardToEmptyPosition(animatedDraggable, whatEmptyPositionTheCardWasReleasedOn, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.startLocation)
            setTimeout(() => {
                returnCard = false
                setUpdatedLocation({
                    x: (startLocation.x - (props.unitsAndLocations.spacing + (1/6 + whatEmptyPositionTheCardWasReleasedOn * (1 + 1/6)) * props.unitsAndLocations.unit)),
                    y: (startLocation.y - ((0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * props.unitsAndLocations.unit)),
                })
                props.handleMovedCardToEmptyPosition(props.index, whatEmptyPositionTheCardWasReleasedOn)
            }, 1000)
            return
        }

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



