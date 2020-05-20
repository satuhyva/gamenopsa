import React, { useState, useImperativeHandle, useEffect } from 'react'
import { View } from 'react-native'
import ControllablePlayerCard from './ControllablePlayerCard'
import { toLeftOrRightGameStackInSingleCardDealing,
    getIndexOfPossibleCardBelow,
    getCardStatesAtStart,
    getCardFlipStateAfterDealing,
    getOccupancyDataAfterFirstDealingCards,
    isThereAPositionBelow,
    handleCardStateChanges,
    handleOccupancyDataChanges,
    getCurrentPosition,
    updateGameStackTopmostCard,
} from './helperFunctions.js'


const PlayerCards = React.forwardRef((props, ref) => {


    const [playerCards] = useState(props.playerCards)
    const [cardReferences] = useState(playerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.playerCards.length > 15 ? 15 : 100)
    const [cardStates, setCardStates] = useState(getCardStatesAtStart(props.playerCards.length))
    const [occupancyData, setOccupancyData] = useState(getOccupancyDataAfterFirstDealingCards(props.playerCards.length))
    const timing = props.unitsAndLocations.timing

    const dealSolitaireCards = () => {
        const limit = Math.min(playerCards.length, 15)
        for (let i = 0; i < limit; i++) {
            cardReferences[i].current.moveAndPossiblyFlipWithDelay(timing.moveDurationDealing, timing.flipDurationDealing)
        }
        setTimeout(() => {
            updateCardStatesAfterSolitaireDealing(cardStates, setCardStates)
        }, (timing.moveDurationDealing + timing.flipDurationDealing) + 500 * limit)
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
            cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
            setTimeout(() => {
                handleCardStateChanges([{ index: cardIndex, newState: 'null' }, { index: indexOfCardBelow, newState: 'draggable' }], cardStates, setCardStates)
            }, timing.flipDurationGaming)
        }
    }

    const handleMovedCardToEmptyPosition = (cardIndex, emptyPositionIndex) => {
        handleOccupancyDataChanges(cardIndex, 'occupy', emptyPositionIndex, occupancyData, setOccupancyData)
        const isTherePositioBelow = isThereAPositionBelow(cardIndex, occupancyData)
        if (isTherePositioBelow) {
            const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
            if (indexOfCardBelow !== -1) {
                cardReferences[indexOfCardBelow].current.flipOnly(timing.flipDurationGaming)
                setTimeout(() => {
                    handleCardStateChanges([{ index: cardIndex, newState: 'draggable' }, { index: indexOfCardBelow, newState: 'draggable' }], cardStates, setCardStates)
                }, timing.flipDurationGaming)
            }
        }
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
    const returnTopmostValues = () => {
        return { left: props.topmostStuff.valueLeft.value, right: props.topmostStuff.valueRight.value }
    }

    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard, returnOccupancyData, returnTopmostValues, returnGameRoundOverStateData }
    })

    useEffect(() => {
        const playerSolitaireCardsAreAllPlayed = occupancyData.every(position => position === -1)
        if (playerSolitaireCardsAreAllPlayed) {
            props.endRound('player')
        }
    },[occupancyData, props])


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


// HELPER FUNCTIONS FOR COMPONENT PlayerCards

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









