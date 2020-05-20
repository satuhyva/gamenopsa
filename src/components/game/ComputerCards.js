import React, { useState, useImperativeHandle, useEffect } from 'react'
import { View } from 'react-native'
import ControllableComputerCard from './ControllableComputerCard'
import { toLeftOrRightGameStackInSingleCardDealing,
    getIndexOfPossibleCardBelow,
    getIndexOfCardToMoveAndTargetStack,
    getCardStatesAtStart,
    getOccupancyDataAfterFirstDealingCards,
    handleCardStateChanges,
    handleOccupancyDataChanges,
    getCurrentPosition,
    updateGameStackTopmostCard,
    getEmptyPositionAndCardToMoveThere,
    getComputerCardSolitaireLocation,
    handleEmptyMoveOccupancyDataChanges,
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

    const moveCardToEmptyPosition = () => {
        const emptyPositionAndCardToMoveThere = getEmptyPositionAndCardToMoveThere(occupancyData, computerCards)
        const newLocation = getComputerCardSolitaireLocation(emptyPositionAndCardToMoveThere.emptyPosition, props.unitsAndLocations.unit, props.unitsAndLocations.spacing)
        const cardToMoveIndex = emptyPositionAndCardToMoveThere.cardToMoveIndex
        cardReferences[cardToMoveIndex].current.moveCardToLocation(newLocation, timing.moveDurationComputerCardGaming)
        setTimeout(() => {
            const currentPosition = getCurrentPosition(cardToMoveIndex, occupancyData)
            handleEmptyMoveOccupancyDataChanges(cardToMoveIndex, emptyPositionAndCardToMoveThere.emptyPosition, occupancyData, setOccupancyData)
            const indexOfCardBelow = getIndexOfPossibleCardBelow(cardToMoveIndex)
            if (currentPosition > 4 && indexOfCardBelow !== -1) {
                cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
                setTimeout(() => {
                    handleCardStateChanges([{ index: cardToMoveIndex, newState: 'movable' }, { index: indexOfCardBelow, newState: 'movable' }], cardStates, setCardStates)
                }, timing.flipDurationGaming)
            }
        }, timing.moveDurationComputerCardGaming)
    }

    const startComputerCardMoveIfPossible = () => {
        const indexOfCardToMove = getIndexOfCardToMoveAndTargetStack(computerCards, occupancyData, props.topmostStuff.valueLeft, props.topmostStuff.valueRight)
        if (indexOfCardToMove.cardIndex !== -1) {
            const targetPackLocation = indexOfCardToMove.target === 'left' ? props.unitsAndLocations.leftGamingStackXY : props.unitsAndLocations.rightGamingStackXY //  getTargetPackLocation(indexOfCardToMove.target, props.unitsAndLocations.unit, props.unitsAndLocations.spacing)
            cardReferences[indexOfCardToMove.cardIndex].current.moveCardToLocation(targetPackLocation, timing.moveDurationComputerCardGaming)
            finalizeCardMoveOrSendCardBackToSolitaire(indexOfCardToMove)
        }
    }

    const finalizeCardMoveOrSendCardBackToSolitaire = (indexOfCardToMove) => {
        // ! Currently the situation where the placement is no longer valid is not handled.
        // ! Always the card is placed in the target stack, even though the player has put a card onto it.
        // ! The sending back does not ever happen at the moment.
        // ! The old first version of sending the card back when necessary is at the end of this file. Does not work.
        // TODO: implement the sending back when placement no longer valid!!!
        setTimeout(() => {
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
        }, timing.moveDurationComputerCardGaming)
    }


    const returnOccupancyData = () => {
        return occupancyData
    }
    const returnGameRoundOverStateData = () => {
        return {
            occupancyData: occupancyData,
            indexDealNext: indexDealNext,
        }
    }

    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard, startComputerCardMoveIfPossible, returnOccupancyData, returnGameRoundOverStateData, moveCardToEmptyPosition }
    })

    const flipPossibleCardBelow = (cardIndex) => {
        const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
        if (indexOfCardBelow !== -1) {
            cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
        }
    }

    useEffect(() => {
        const computerSolitaireCardsAreAllPlayed = occupancyData.every(position => position === -1)
        if (computerSolitaireCardsAreAllPlayed) {
            props.endRound('computer')
        }
    },[occupancyData, props])

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



// ! This is the old first version of sending the card back when necessary. Does not work.
// setTimeout(() => {
//     const placementIsStillValid = getPlacementValidity(computerCards[indexOfCardToMove.cardIndex], indexOfCardToMove.target, props.topmostStuff)
//     if (placementIsStillValid) {
//         const currentPosition = getCurrentPosition(indexOfCardToMove.cardIndex, occupancyData)
//         updateGameStackTopmostCard(indexOfCardToMove.target, props.topmostStuff, computerCards[indexOfCardToMove.cardIndex])
//         handleCardStateChanges([{ index: indexOfCardToMove.cardIndex, newState: 'null' }], cardStates, setCardStates)
//         handleOccupancyDataChanges(indexOfCardToMove.cardIndex, 'vacate', 'none', occupancyData, setOccupancyData)
//         const indexOfCardBelow = getIndexOfPossibleCardBelow(indexOfCardToMove.cardIndex)
//         if (currentPosition > 4 && indexOfCardBelow !== -1) {
//             cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
//             setTimeout(() => {
//                 handleCardStateChanges([{ index: indexOfCardToMove.cardIndex, newState: 'null' }, { index: indexOfCardBelow, newState: 'movable' }], cardStates, setCardStates)
//             }, timing.flipDurationGaming)
//         }
//     } else {
//         const location = getComputerCardLocationAfterDealing(indexOfCardToMove.cardIndex, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.computerCards.length)
//         cardReferences[indexOfCardToMove.cardIndex].current.moveCardToLocation(location)
//     }
// }, timing.moveDurationComputerCardGaming)

