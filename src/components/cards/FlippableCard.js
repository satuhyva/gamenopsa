import React, { useImperativeHandle } from 'react'
import { View, Animated } from 'react-native'
import CardFront from './CardFront'
import CardBack from './CardBack'


const getCardStyle = (unit) => {
    return {
        width: unit,
        height: unit * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }
}

const performFlipAnimations = (animatedFlipBackside, animatedFlipFrontside) => {
    Animated.sequence([
        Animated.timing(animatedFlipBackside, {
            toValue: 90, tension: 10, friction: 10, duration: 300,
        }),
        Animated.timing(animatedFlipFrontside, {
            toValue: 180, tension: 10, friction: 10, duration: 300,
        }),
    ]).start()
}



const FlippableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.unitsAndLocations.unit)
    const timing = props.unitsAndLocations.timing

    let animatedFlipBackside = new Animated.Value(0)
    const interpolatedFlipBackside = animatedFlipBackside.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlipBacksideStyle = { transform: [ { rotateX: interpolatedFlipBackside } ] }

    let animatedFlipFrontside = new Animated.Value(90)
    const interpolatedFlipFrontside = animatedFlipFrontside.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlipFrontsideStyle = { transform: [ { rotateX: interpolatedFlipFrontside } ] }


    const flip = () => {
        const stateAfterFlipping = props.index > 14 ? 'null' : 'draggable'
        performFlipAnimations(animatedFlipBackside, animatedFlipFrontside)
        setTimeout(() => {
            props.convertCardState(stateAfterFlipping)
        }, timing.medium)
    }

    useImperativeHandle(ref, () => {
        return { flip }
    })


    return (
        <View>
            <Animated.View style={[cardStyle, { position: 'absolute', left: 0 }, animatedFlipBacksideStyle]}>
                <CardBack scaleUnit={props.unitsAndLocations.unit}/>
            </Animated.View>
            <Animated.View style={[cardStyle, animatedFlipFrontsideStyle]}>
                <CardFront card={props.card}/>
            </Animated.View>
        </View>
    )
})

export default FlippableCard

