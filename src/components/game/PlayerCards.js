import React, { useState, useImperativeHandle, useEffect } from 'react'
import { View } from 'react-native'
import ControllablePlayerCard from './ControllablePlayerCard'
import { toLeftOrRightGameStackInSingleCardDealing,
    getIndexOfPossibleCardBelow,
    getCardStatesAtStart,
    getCardFlipStateAfterDealing,
    getOccupancyDataAfterFirstDealingCards,
    isThereAPositionBelow,
} from './helperFunctions.js'


const getPlayerCardsPlayedStates = (cardCount) => {
    let playedStates = []
    for (let i = 0; i < cardCount; i++) {
        playedStates.push(false)
    }
    return playedStates
}

const handleCardStateChanges = (cardsAndNewStates, cardStates, setCardStates) => {
    const updatedCardStates = [...cardStates]
    for (let i = 0; i < cardsAndNewStates.length; i++) {
        updatedCardStates[cardsAndNewStates[i].index] = cardsAndNewStates[i].newState
    }
    setCardStates(updatedCardStates)
}


const updateCardStatesAfterSolitaireDealing = (cardStates, setCardStates) => {
    const updatedCardStates = [...cardStates]
    const number = Math.min(cardStates.length, 15)
    for (let i = 0; i < number; i++) {
        const willFlipAfterDealing = getCardFlipStateAfterDealing(i, cardStates.length)
        if (willFlipAfterDealing) {
            updatedCardStates[i] = 'draggable'
        }
    }
    setCardStates(updatedCardStates)
}

const updateGameStackTopmostCard = (side, topmostStuff, card) => {
    if (side === 'left') {
        topmostStuff.changeLeft(card)
    } else {
        topmostStuff.changeRight(card)
    }
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



const PlayerCards = React.forwardRef((props, ref) => {

    const [playerCards] = useState(props.playerCards)
    const [cardReferences] = useState(playerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.playerCards.length > 15 ? 15 : 100)
    const [playedStates, setPlayedStates] = useState(getPlayerCardsPlayedStates(props.playerCards.length))
    const [cardStates, setCardStates] = useState(getCardStatesAtStart(props.playerCards.length))
    const [occupancyData, setOccupancyData] = useState(getOccupancyDataAfterFirstDealingCards(props.playerCards.length))
    const timing = props.unitsAndLocations.timing


    useEffect(() => {
        let gameOver = true
        let min = Math.min(15, playerCards.length)
        for (let i = 0; i < min; i++) {
            if (playedStates[i] === false) {
                gameOver = false
            }
        }
        if (gameOver) {
            props.gameOverEndRound('player')
        }
    },[playedStates, playerCards.length, props])



    const dealSolitaireCards = () => {
        const limit = Math.min(playerCards.length, 15)
        for (let i = 0; i < limit; i++) {
            cardReferences[i].current.moveAndPossiblyFlipWithDelay(timing.moveDurationDealing, timing.flipDurationDealing)
        }
        setTimeout(() => {
            updateCardStatesAfterSolitaireDealing(cardStates, setCardStates)
        }, (timing.moveDurationDealing + timing.flipDurationDealing) + 500 * playerCards.length)
    }


    const dealSingleCard = () => {
        if (indexDealNext < props.playerCards.length) {
            cardReferences[indexDealNext].current.moveAndPossiblyFlipWithDelay(timing.moveDurationDealing, timing.flipDurationDealing)
            setTimeout(() => {
                const toWhichStack = toLeftOrRightGameStackInSingleCardDealing(indexDealNext, playerCards.length)
                updateGameStackTopmostCard(toWhichStack, props.topmostStuff, playerCards[indexDealNext])
                handleCardStateChanges([{ index: indexDealNext, newState: 'null' }], cardStates, setCardStates)
                setIndexDealNext(indexDealNext + 1)
            }, timing.moveDurationDealing + timing.flipDurationDealing)
        }
    }


    const handleChangesAfterPlayingACard = (cardIndex, gamingStack) => {
        const currentPosition = getCurrentPosition(cardIndex, occupancyData)
        updateGameStackTopmostCard(gamingStack, props.topmostStuff, playerCards[cardIndex])
        handleCardStateChanges([{ index: cardIndex, newState: 'null' }], cardStates, setCardStates)
        handleOccupancyDataChanges(cardIndex, 'vacate', 'none', occupancyData, setOccupancyData)
        const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
        if (currentPosition > 4 && indexOfCardBelow !== -1) {
            cardReferences[indexOfCardBelow].current.flipOnly(600)
            setTimeout(() => {
                handleCardStateChanges([{ index: cardIndex, newState: 'null' }, { index: indexOfCardBelow, newState: 'draggable' }], cardStates, setCardStates)
            }, 600)
        }
    }

    const handleMovedCardToEmptyPosition = (cardIndex, emptyPositionIndex) => {
        handleOccupancyDataChanges(cardIndex, 'occupy', emptyPositionIndex, occupancyData, setOccupancyData)
        const isTherePositioBelow = isThereAPositionBelow(cardIndex, occupancyData)
        if (isTherePositioBelow) {
            const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
            if (indexOfCardBelow !== -1) {
                cardReferences[indexOfCardBelow].current.flipOnly(600)
                setTimeout(() => {
                    handleCardStateChanges([{ index: cardIndex, newState: 'draggable' }, { index: indexOfCardBelow, newState: 'draggable' }], cardStates, setCardStates)
                }, 600)
            }
        }

    }


    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard }
    })



    return (
        <View>
            {playerCards.map((card, index) => {
                return (
                    <ControllablePlayerCard
                        key={index}
                        index={index}
                        card={card}
                        ref={cardReferences[index]}
                        cardCount={playerCards.length}
                        unitsAndLocations={props.unitsAndLocations}
                        topmostStuff={props.topmostStuff}
                        cardState={cardStates[index]}
                        handleChangesAfterPlayingACard={handleChangesAfterPlayingACard}
                        handleMovedCardToEmptyPosition={handleMovedCardToEmptyPosition}
                        occupancyData={occupancyData}
                    />
                )
            })}
        </View>
    )
})


export default PlayerCards

