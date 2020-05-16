import React, { useState } from 'react'
import MovableFlippableCard from '../cards/MovableFlippableCard'
import { getCardFlipStateAfterDealing,
    getComputerCardLocationAfterDealing,
    getComputerCardStartLocation,
} from './helperFunctions.js'



const ControllableComputerCard = React.forwardRef((props, ref) => {

    const [cardState, setCardState] = useState('movable')
    const [locationAtStart] = useState(getComputerCardStartLocation(props.unitsAndLocations.unit, props.unitsAndLocations.spacing))
    const [locationAfterDealing] = useState(getComputerCardLocationAfterDealing(props.index, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.cardCount))
    const [cardWillFlipAfterDealing] = useState(getCardFlipStateAfterDealing(props.index, props.cardCount))

    const convertCardState = (newState) => {
        setCardState(newState)
    }

    if (cardState === 'null') {
        return null
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
                setComputerCardToPlayed={props.setComputerCardToPlayed}
                unitsAndLocations={props.unitsAndLocations}
            />
        )
    }

})

export default ControllableComputerCard

