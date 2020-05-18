import React, { useState, useImperativeHandle, useEffect } from 'react'
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
} from './helperFunctions.js'


const getComputerCardsPlayedStates = (cardCount) => {
    let playedStates = []
    for (let i = 0; i < cardCount; i++) {
        playedStates.push(false)
    }
    return playedStates
}

const updateGameStackTopmostCard = (side, topmostStuff, card) => {
    if (side === 'left') {
        topmostStuff.changeLeft(card)
    } else {
        topmostStuff.changeRight(card)
    }
}

const handleCardStateChanges = (cardsAndNewStates, cardStates, setCardStates) => {
    const updatedCardStates = [...cardStates]
    for (let i = 0; i < cardsAndNewStates.length; i++) {
        updatedCardStates[cardsAndNewStates[i].index] = cardsAndNewStates[i].newState
    }
    setCardStates(updatedCardStates)
}

const handleOccupancyDataChanges = (cardIndex, action, positionToOccupy, occupancyData, setOccupancyData) => {
    let updatedOccupancyData = [...occupancyData]
    let locationToFree
    for (let j = 0; j < updatedOccupancyData.length; j++) {
        if (updatedOccupancyData[j] === cardIndex) {
            locationToFree = j
        }
    }
    updatedOccupancyData[locationToFree] = -1
    if (action === 'occupy') {
        updatedOccupancyData[positionToOccupy] = cardIndex
    }
    setOccupancyData(updatedOccupancyData)
}

const getCurrentPosition = (cardIndex, occupancyData) => {
    let position
    for (let i = 0; i < occupancyData.length; i++) {
        if (occupancyData[i] === cardIndex) {
            position = i
        }
    }
    return position
}




const ComputerCards = React.forwardRef((props, ref) => {

    const [computerCards] = useState(props.computerCards)
    const [cardReferences] = useState(computerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.computerCards.length > 15 ? 15 : 100)
    // const [visibleCards, setVisibleCards] = useState(getVisibleComputerCardsAtStart(computerCards.length))
    const [playedStates, setPlayedStates] = useState(getComputerCardsPlayedStates(props.computerCards.length))
    const [cardStates, setCardStates] = useState(getCardStatesAtStart(props.computerCards.length))
    const [occupancyData, setOccupancyData] = useState(getOccupancyDataAfterFirstDealingCards(props.computerCards.length))
    const timing = props.unitsAndLocations.timing

    useEffect(() => {
        let gameOver = true
        let min = Math.min(15, computerCards.length)
        for (let i = 0; i < min; i++) {
            if (playedStates[i] === false) {
                gameOver = false
            }
        }
        if (gameOver) {
            props.gameOverEndRound('computer')
        }
    },[playedStates, computerCards.length, props])


    const setComputerCardToPlayed = (cardIndex) => {
        const updatedPlayedCards = [...playedStates]
        updatedPlayedCards[cardIndex] = true
        setPlayedStates(updatedPlayedCards)
    }

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

    const performComputerCardMoveIfPossible = () => {
        const indexOfCardToMove = getIndexOfCardToMoveAndTargetStack(computerCards, occupancyData, props.topmostStuff.valueLeft, props.topmostStuff.valueRight)
        // console.log('indexOfCardToMove', indexOfCardToMove)
        // console.log(computerCards[indexOfCardToMove.cardIndex])
        if (indexOfCardToMove.cardIndex !== -1) {
            const targetPackLocation = getTargetPackLocation(indexOfCardToMove.target, props.unitsAndLocations.unit, props.unitsAndLocations.spacing)
            // cardReferences[indexOfCardToMove.cardIndex].current.moveAndNull(targetPackLocation, true)
            cardReferences[indexOfCardToMove.cardIndex].current.moveCardToLocation(targetPackLocation, timing.moveDurationComputerGaming)
            setTimeout(() => {
                const placementIsStillValid = getPlacementValidity(computerCards[indexOfCardToMove.cardIndex], indexOfCardToMove.target, props.topmostStuff)
                // console.log('placementIsStillValid', placementIsStillValid)
                // console.log('left', props.topmostStuff.valueLeft, 'right', props.topmostStuff.valueRight)
                // console.log('card value', computerCards[indexOfCardToMove.cardIndex].value)
                // console.log('indexOfCardToMove.cardIndex', indexOfCardToMove.cardIndex)
                if (placementIsStillValid) {
                    const currentPosition = getCurrentPosition(indexOfCardToMove.cardIndex, occupancyData)
                    updateGameStackTopmostCard(indexOfCardToMove.target, props.topmostStuff, computerCards[indexOfCardToMove.cardIndex])
                    handleCardStateChanges([{ index: indexOfCardToMove.cardIndex, newState: 'null' }], cardStates, setCardStates)
                    handleOccupancyDataChanges(indexOfCardToMove.cardIndex, 'vacate', 'none', occupancyData, setOccupancyData)
                    const indexOfCardBelow = getIndexOfPossibleCardBelow(indexOfCardToMove.cardIndex)
                    if (currentPosition > 4 && indexOfCardBelow !== -1) {
                        cardReferences[indexOfCardBelow].current.flipOnly(600)
                        setTimeout(() => {
                            handleCardStateChanges([{ index: indexOfCardToMove.cardIndex, newState: 'null' }, { index: indexOfCardBelow, newState: 'movable' }], cardStates, setCardStates)
                        }, 1500)
                    }
                } else {
                    const location = getComputerCardLocationAfterDealing(indexOfCardToMove.cardIndex, props.unitsAndLocations.unit, props.unitsAndLocations.spacing, props.computerCards.length)
                    cardReferences[indexOfCardToMove.cardIndex].current.moveCardToLocation(location)
                }
            }, timing.moveDurationComputerGaming)

            // setTimeout(() => {
            //     // updateGameStackTopmostCard(indexOfCardToMove.target, props.topmostStuff, computerCards[indexOfCardToMove.cardIndex])
            //     let updatedVisibleCards = visibleCards.filter(cardIndex => cardIndex !== indexOfCardToMove.cardIndex)
            //     const indexOfCardBelow = getIndexOfPossibleCardBelow(indexOfCardToMove.cardIndex)
            //     if (indexOfCardBelow !== -1) {
            //         updatedVisibleCards.push(indexOfCardBelow)
            //     }
            //     setVisibleCards(updatedVisibleCards)
            // }, 1000)
            // setTimeout(() => {
            //     flipPossibleCardBelow(indexOfCardToMove.cardIndex)
            // }, 1500)

        }

    }

    // console.table(cardStates)

    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard, performComputerCardMoveIfPossible }
    })

    const flipPossibleCardBelow = (cardIndex) => {
        const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
        if (indexOfCardBelow !== -1) {
            cardReferences[indexOfCardBelow].current.flipOnly(600)
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
                        setComputerCardToPlayed={setComputerCardToPlayed}
                        unitsAndLocations={props.unitsAndLocations}
                        cardState={cardStates[index]}
                    />
                )
            })}
        </View>
    )


})

export default ComputerCards


