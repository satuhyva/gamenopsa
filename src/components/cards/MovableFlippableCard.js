import React, { useImperativeHandle, useState } from 'react'
import { Animated } from 'react-native'
import FlippableCard from '../cards/FlippableCard'


const moveToNewLocation = (animatedMove, startLocation, delay, newLocation) => {
    Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedMove, {
            toValue: { x: newLocation.x - startLocation.x, y: newLocation.y - startLocation.y }, duration: 1000,
        }),
    ]).start()
}



const MovableFlippableCard = React.forwardRef((props, ref) => {

    const [animatedMove] = useState(new Animated.ValueXY())
    const animatedMoveStyle = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y } ] }
    const [startLocation] = useState(props.startLocation)
    const referenceFlip = React.createRef()

    const flip = () => {
        referenceFlip.current.flip()
    }

    const moveAndPossiblyFlip = () => {
        const delay = props.index > 14 ? 0 : 500 * props.index
        moveToNewLocation(animatedMove, startLocation, delay, props.endLocation)
        if (props.flip) {
            setTimeout(() => {
                flip()
            }, delay + 1000)
        }
    }

    const moveAndNull = (targetLocation, nullify) => {
        moveToNewLocation(animatedMove, startLocation, 0, targetLocation)
        if (nullify) {
            setTimeout(() => {
                props.convertCardState('null')
                props.setComputerCardToPlayed(props.index)
            }, 1000)
        }
    }

    const returnToOriginal = () => {
        moveToNewLocation(animatedMove, startLocation, 0, { x: 0, y: 0 })
        setTimeout(() => {
            props.convertCardState('movable')
        }, 1000)
    }

    useImperativeHandle(ref, () => {
        return { moveAndPossiblyFlip, flip, moveAndNull, returnToOriginal }
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


