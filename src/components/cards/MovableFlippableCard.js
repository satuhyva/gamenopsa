import React, { useImperativeHandle, useState } from 'react'
import { Animated } from 'react-native'
import FlippableCard from '../cards/FlippableCard'


const MovableFlippableCard = React.forwardRef((props, ref) => {

    const [animatedMove] = useState(new Animated.ValueXY())
    const animatedMoveStyle = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y } ] }
    const [startLocation] = useState(props.startLocation)
    const referenceFlip = React.createRef()

    const flipOnly = (flipDurationDealing) => {
        referenceFlip.current.flip(flipDurationDealing)
    }

    const moveAndPossiblyFlipWithDelay = (moveDurationDealing, flipDurationDealing) => {
        const delay = props.index > 14 ? 0 : 500 * props.index
        moveToNewLocation(animatedMove, startLocation, delay, props.endLocation, moveDurationDealing)
        if (props.flip) {
            setTimeout(() => {
                flipOnly(flipDurationDealing)
            }, delay + moveDurationDealing)
        }
    }

    const moveCardToLocation = (location) => {
        moveToNewLocation(animatedMove, startLocation, 0, location, 1000)
    }

    useImperativeHandle(ref, () => {
        return { moveAndPossiblyFlipWithDelay, flipOnly, moveCardToLocation }
    })

    return (
        <Animated.View style={[animatedMoveStyle, { position: 'absolute', left: startLocation.x, top: startLocation.y }]}>
            <FlippableCard
                ref={referenceFlip}
                index={props.index}
                card={props.card}
                convertCardState={props.convertCardState}
                unitsAndLocations={props.unitsAndLocations}
            />
        </Animated.View>
    )
})

export default MovableFlippableCard


// HELPER FUNCTIONS FOR THE COMPONENT MovableFlippableCard

const moveToNewLocation = (animatedMove, startLocation, delay, newLocation, moveDuration) => {
    Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedMove, {
            toValue: { x: newLocation.x - startLocation.x, y: newLocation.y - startLocation.y }, duration: moveDuration,
        }),
    ]).start()
}



