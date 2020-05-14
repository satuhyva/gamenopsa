import React, { useState } from 'react'
import MovableFlippableCard from '../cards/MovableFlippableCard'
import DraggableCard from '../cards/DraggableCard'
import { getPlayerCardLocationAfterDealing, getPlayerCardStartLocation, getCardFlipStateAfterDealing } from './helperFunctions.js'


const ControllablePlayerCard = React.forwardRef((props, ref) => {

    const [cardState, setCardState] = useState('movable')
    const [locationAtStart] = useState(getPlayerCardStartLocation(props.scaleUnit, props.spacing))
    const [locationAfterDealing] = useState(getPlayerCardLocationAfterDealing(props.index, props.scaleUnit, props.spacing, props.cardCount))
    const [cardWillFlipAfterDealing] = useState(getCardFlipStateAfterDealing(props.index, props.cardCount))

    const convertCardState = (newState) => {
        setCardState(newState)
    }

    if (cardState === 'null') {
        return null
    } else if (cardState === 'draggable') {
        return (
            <DraggableCard
                card={props.card}
                ref={ref}
                index={props.index}
                size={props.scaleUnit}
                startLocation={locationAfterDealing}
                topmostLeft={props.topmostLeft}
                topmostRight={props.topmostRight}
                changeTopmostRight={props.changeTopmostRight}
                changeTopmostLeft={props.changeTopmostLeft}
                spacing={props.spacing}
                convertCardState={convertCardState}
                flipPossibleCardBelow={props.flipPossibleCardBelow}
                setPlayerCardToPlayed={props.setPlayerCardToPlayed}
                emptyPositions={props.emptyPositions}
                handleEmptyPositionStateChanged={props.handleEmptyPositionStateChanged}
            />
        )
    } else {
        return (
            <MovableFlippableCard
                ref={ref}
                index={props.index}
                scaleUnit={props.scaleUnit}
                startLocation={locationAtStart}
                card={props.card}
                endLocation={locationAfterDealing}
                flip={cardWillFlipAfterDealing}
                convertCardState={convertCardState}
            />
        )
    }

})

export default ControllablePlayerCard

