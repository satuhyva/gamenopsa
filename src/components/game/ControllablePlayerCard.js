import React, { useState } from 'react'
import MovableFlippableCard from '../cards/MovableFlippableCard'
import DraggableCard from '../cards/DraggableCard'
import { getPlayerCardLocationAfterDealing, getPlayerCardStartLocation, getCardFlipStateAfterDealing } from './helperFunctions.js'


const ControllablePlayerCard = React.forwardRef((props, ref) => {


    const [cardState, setCardState] = useState('movable')
    const [locationAtStart] = useState(getPlayerCardStartLocation(props.unitsAndLocations.unit, props.unitsAndLocations.spacing))
    const [locationAfterDealing] = useState(getPlayerCardLocationAfterDealing(props.index, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.cardCount))
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
                startLocation={locationAfterDealing}
                convertCardState={convertCardState}
                flipPossibleCardBelow={props.flipPossibleCardBelow}
                setPlayerCardToPlayed={props.setPlayerCardToPlayed}
                emptyPositions={props.emptyPositions}
                handleEmptyPositionStateChanged={props.handleEmptyPositionStateChanged}
                unitsAndLocations={props.unitsAndLocations}
                topmostStuff={props.topmostStuff}
            />
        )
    } else {
        return (
            <MovableFlippableCard
                ref={ref}
                index={props.index}
                startLocation={locationAtStart}
                card={props.card}
                endLocation={locationAfterDealing}
                flip={cardWillFlipAfterDealing}
                convertCardState={convertCardState}
                unitsAndLocations={props.unitsAndLocations}
            />
        )
    }

})

export default ControllablePlayerCard

