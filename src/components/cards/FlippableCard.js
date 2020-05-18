import React, { useImperativeHandle } from 'react'
import { View, Animated } from 'react-native'
import CardFront from './CardFront'
import CardBack from './CardBack'


const FlippableCard = React.forwardRef((props, ref) => {

    const cardStyle = getCardStyle(props.unitsAndLocations.unit)

    let animatedFlipBacksideValue = new Animated.Value(0)
    const interpolatedFlipBackside = animatedFlipBacksideValue.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlipBacksideStyle = { transform: [ { rotateX: interpolatedFlipBackside } ] }

    let animatedFlipFrontsideValue = new Animated.Value(90)
    const interpolatedFlipFrontside = animatedFlipFrontsideValue.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlipFrontsideStyle = { transform: [ { rotateX: interpolatedFlipFrontside } ] }

    const flip = (flipDuration) => {
        performFlipAnimations(animatedFlipBacksideValue, animatedFlipFrontsideValue, flipDuration)
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



// HELPER FUNCTIONS FOR THE COMPONENT FlippableCard

const getCardStyle = (unit) => {
    return {
        width: unit,
        height: unit * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }
}

const performFlipAnimations = (animatedFlipBacksideValue, animatedFlipFrontsideValue, flipDuration) => {
    Animated.sequence([
        Animated.timing(animatedFlipBacksideValue, {
            toValue: 90, tension: 10, friction: 10, duration: flipDuration / 2,
        }),
        Animated.timing(animatedFlipFrontsideValue, {
            toValue: 180, tension: 10, friction: 10, duration: flipDuration / 2,
        }),
    ]).start()
}

