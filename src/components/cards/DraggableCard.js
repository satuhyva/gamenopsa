import React, { useState } from 'react'
import { Animated, PanResponder, TouchableOpacity } from 'react-native'
import CardFront from './CardFront'


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



const DraggableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.size)
    const [startLocation] = useState(props.startLocation)

    let animatedDraggable = new Animated.ValueXY()
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }


    const handleReleasedCard = (releaseX, releaseY) => {
        // const wasReleasedOnRight = wasReleasedOnRightGamingPack(releaseX, releaseY, unitWidth, bufferLeft)
        // const valueOkForRight = valueIsSuitable(topmostGamingRight.value, card.value)
        // if (wasReleasedOnRight && valueOkForRight) {
        //     moveCardOntoRightGamePack(releaseX, releaseY)
        //     setTimeout(() => {
        //         props.updateRightGamingPack(index)
        //     }, 500)
        // } else {
        returnCardToStartDragPosition(animatedDraggable)
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



