import React, { useState, useImperativeHandle } from 'react'
import { View } from 'react-native'
import ControllableComputerCard from './ControllableComputerCard'
import { toLeftOrRightGameStackInSingleCardDealing,
    getIndexOfPossibleCardBelow,
    getIndexOfCardToMoveAndTargetStack,
    getTargetPackLocation,
    getCardStatesAtStart,
    getPlacementValidity,
    getComputerCardLocationAfterDealing,
    getOccupancyDataAfterFirstDealingCards,
    handleCardStateChanges,
    handleOccupancyDataChanges,
    getCurrentPosition,
    updateGameStackTopmostCard,
} from './helperFunctions.js'


const ComputerCards = React.forwardRef((props, ref) => {

    const [computerCards] = useState(props.computerCards)
    const [cardReferences] = useState(computerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.computerCards.length > 15 ? 15 : 100)
    const [cardStates, setCardStates] = useState(getCardStatesAtStart(props.computerCards.length))
    const [occupancyData, setOccupancyData] = useState(getOccupancyDataAfterFirstDealingCards(props.computerCards.length))
    const timing = props.unitsAndLocations.timing

    const dealSolitaireCards = () => {
        const limit = Math.min(computerCards.length, 15)
        for (let i = 0; i < limit; i++) {
            cardReferences[i].current.moveAndPossiblyFlipWithDelay(timing.moveDurationDealing, timing.flipDurationDealing)
        }
    }

    const dealSingleCard = () => {
        if (indexDealNext < props.computerCards.length) {
            cardReferences[indexDealNext].current.moveAndPossiblyFlipWithDelay(timing.moveDurationDealing, timing.flipDurationDealing)
            setTimeout(() => {
                const toWhichStack = toLeftOrRightGameStackInSingleCardDealing('left', indexDealNext, computerCards.length)
                updateGameStackTopmostCard(toWhichStack, props.topmostStuff, computerCards[indexDealNext])
                handleCardStateChanges([{ index: indexDealNext, newState: 'null' }], cardStates, setCardStates)
                setIndexDealNext(indexDealNext + 1)
            }, timing.moveDurationDealing + timing.flipDurationDealing)
        }
    }

    const startComputerCardMoveIfPossible = () => {
        const indexOfCardToMove = getIndexOfCardToMoveAndTargetStack(computerCards, occupancyData, props.topmostStuff.valueLeft, props.topmostStuff.valueRight)
        if (indexOfCardToMove.cardIndex !== -1) {
            const targetPackLocation = getTargetPackLocation(indexOfCardToMove.target, props.unitsAndLocations.unit, props.unitsAndLocations.spacing)
            cardReferences[indexOfCardToMove.cardIndex].current.moveCardToLocation(targetPackLocation, timing.moveDurationComputerCardGaming)
            finalizeCardMoveOrSendCardBackToSolitaire(indexOfCardToMove)
        }
    }

    const finalizeCardMoveOrSendCardBackToSolitaire = (indexOfCardToMove) => {
        setTimeout(() => {
            const placementIsStillValid = getPlacementValidity(computerCards[indexOfCardToMove.cardIndex], indexOfCardToMove.target, props.topmostStuff)
            if (placementIsStillValid) {
                const currentPosition = getCurrentPosition(indexOfCardToMove.cardIndex, occupancyData)
                updateGameStackTopmostCard(indexOfCardToMove.target, props.topmostStuff, computerCards[indexOfCardToMove.cardIndex])
                handleCardStateChanges([{ index: indexOfCardToMove.cardIndex, newState: 'null' }], cardStates, setCardStates)
                handleOccupancyDataChanges(indexOfCardToMove.cardIndex, 'vacate', 'none', occupancyData, setOccupancyData)
                const indexOfCardBelow = getIndexOfPossibleCardBelow(indexOfCardToMove.cardIndex)
                if (currentPosition > 4 && indexOfCardBelow !== -1) {
                    cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
                    setTimeout(() => {
                        handleCardStateChanges([{ index: indexOfCardToMove.cardIndex, newState: 'null' }, { index: indexOfCardBelow, newState: 'movable' }], cardStates, setCardStates)
                    }, timing.flipDurationGaming)
                }
            } else {
                const location = getComputerCardLocationAfterDealing(indexOfCardToMove.cardIndex, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.computerCards.length)
                cardReferences[indexOfCardToMove.cardIndex].current.moveCardToLocation(location)
            }
        }, timing.moveDurationComputerCardGaming)
    }


    const returnState = () => {
        return occupancyData
    }


    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard, startComputerCardMoveIfPossible, returnState }
    })

    const flipPossibleCardBelow = (cardIndex) => {
        const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
        if (indexOfCardBelow !== -1) {
            cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
        }
    }

    return (
        <View>
            {computerCards.map((card, index) => {
                return (
                    <ControllableComputerCard
                        key={index}
                        index={index}
                        card={card}
                        ref={cardReferences[index]}
                        spacing={props.spacing}
                        cardCount={computerCards.length}
                        flipPossibleCardBelow={flipPossibleCardBelow}
                        unitsAndLocations={props.unitsAndLocations}
                        cardState={cardStates[index]}
                    />
                )
            })}
        </View>
    )


})

export default ComputerCards


