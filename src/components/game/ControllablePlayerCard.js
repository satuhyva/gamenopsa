import React, { useState } from 'react'
import MovableFlippableCard from '../cards/MovableFlippableCard'
import DraggableCard from '../cards/DraggableCard'
import { getPlayerCardLocationAfterDealing, getPlayerCardStartLocation, getCardFlipStateAfterDealing } from './helperFunctions.js'


const ControllablePlayerCard = React.forwardRef((props, ref) => {

    const [isDraggableCard, setIsDraggableCard] = useState(false)
    const locationAtStart = getPlayerCardStartLocation(props.scaleUnit, props.spacing)
    const locationAfterDealing = getPlayerCardLocationAfterDealing(props.index, props.scaleUnit, props.spacing, props.cardCount)
    const cardWillFlipAfterDealing = getCardFlipStateAfterDealing(props.index, props.cardCount)

    const convertToDraggableCard = () => {
        setIsDraggableCard(true)
    }

    if (isDraggableCard) {
        return (
            <DraggableCard
                card={props.card}
                ref={ref}
                index={props.index}
                size={props.scaleUnit}
                startLocation={locationAfterDealing}
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
                convertToDraggableCard={convertToDraggableCard}
            />
        )
    }

})

export default ControllablePlayerCard

