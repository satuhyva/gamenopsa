import React, { useState } from 'react'
import MovableFlippableCard from '../cards/MovableFlippableCard'
import DraggableCard from '../cards/DraggableCard'
import { getPlayerCardLocationAfterDealing, getPlayerCardStartLocation, getCardFlipStateAfterDealing } from './helperFunctions.js'


const ControllablePlayerCard = React.forwardRef((props, ref) => {

    const [locationAtStart] = useState(getPlayerCardStartLocation(props.unitsAndLocations.unit, props.unitsAndLocations.spacing))
    const [locationAfterDealing] = useState(getPlayerCardLocationAfterDealing(props.index, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.cardCount))
    const [cardWillFlipAfterDealing] = useState(getCardFlipStateAfterDealing(props.index, props.cardCount))

    if (props.cardState === 'null') {
        return null
    } else if (props.cardState === 'draggable') {
        return (
            <DraggableCard
                card={props.card}
                ref={ref}
                index={props.index}
                startLocation={locationAfterDealing}
                unitsAndLocations={props.unitsAndLocations}
                topmostStuff={props.topmostStuff}
                handleChangesAfterPlayingACard={props.handleChangesAfterPlayingACard}
                handleMovedCardToEmptyPosition={props.handleMovedCardToEmptyPosition}
                occupancyData={props.occupancyData}
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
                unitsAndLocations={props.unitsAndLocations}
            />
        )
    }
})

export default ControllablePlayerCard

