import React, { useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PlayerCards from './PlayerCards'
import CommonGameStacks from './CommonGameStacks'
import ComputerCards from './ComputerCards'
import ControlPanel from './ControlPanel'



const Game = (props) => {

    const [topmostLeft, setTopmostLeft] = useState('')
    const [topmostRight, setTopmostRight] = useState('')
    const [playerCards] = useState(props.game.playerStack)
    const [computerCards] = useState(props.game.computerStack)
    const [referencePlayerCards] = useState(React.createRef())
    const [referenceComputerCards] = useState(React.createRef())
    const [unitsAndLocations] = useState(props.unitsAndLocations)
    const [cumulativeLeftStack, setCumulativeLeftStack] = useState([])
    const [cumulativeRightStack, setCumulativeRightStack] = useState([])
    const [gameIsActive, setGameIsActive] = useState(false)
    const [computerPlayingInterval, setComputerPlayingInterval] = useState('')
    const [newCardsNeededInterval, setNewCardsNeededInterval] = useState('')

    const dealSolitaireCards = () => {
        referencePlayerCards.current.dealSolitaireCards()
        referenceComputerCards.current.dealSolitaireCards()
    }
    const dealSingleCards = () => {
        referencePlayerCards.current.dealSingleCard()
        referenceComputerCards.current.dealSingleCard()
    }

    const changeTopmostLeft = (card) => {
        setTopmostLeft(card)
        let updated = [...cumulativeLeftStack]
        updated.push(card)
        setCumulativeLeftStack(updated)
    }

    const changeTopmostRight = (card) => {
        setTopmostRight(card)
        let updated = [...cumulativeRightStack]
        updated.push(card)
        setCumulativeRightStack(updated)
    }

    const gameOverEndRound = (theWinner) => {
        setTimeout(() => {
            props.gameRoundOver(theWinner)
        }, 2000)
    }

    const topmostStuff = {
        valueLeft: topmostLeft,
        valueRight: topmostRight,
        changeLeft: changeTopmostLeft,
        changeRight: changeTopmostRight,
    }


    const changeGameIsActiveState = () => {
        if (!gameIsActive) {
            setComputerPlayingInterval(
                setInterval(() => {
                    referenceComputerCards.current.startComputerCardMoveIfPossible()
                }, 4000),
            )
            setNewCardsNeededInterval(
                setInterval(() => {
                    const occupancyDataPlayer = referencePlayerCards.current.returnState()
                    const occupancyDataComputer = referenceComputerCards.current.returnState()
                    const topmostValues = referencePlayerCards.current.returnTopmostValues()
                    const dealingOfNewCardsIsNeeded = newCardsAreNeeded(occupancyDataPlayer, occupancyDataComputer, topmostValues.left, topmostValues.right, playerCards, computerCards)
                    console.log('dealingOfNewCardsIsNeeded', dealingOfNewCardsIsNeeded)
                    if (dealingOfNewCardsIsNeeded) {
                        setGameIsActive()
                    }
                }, 4000),
            )
        } else {
            clearInterval(computerPlayingInterval)
            clearInterval(newCardsNeededInterval)
        }
        setGameIsActive(!gameIsActive)
    }



    return (
        <View>
            <CommonGameStacks
                topmostLeft={topmostLeft}
                topmostRight={topmostRight}
                unitsAndLocations={unitsAndLocations}
            />
            <PlayerCards
                playerCards={playerCards}
                ref={referencePlayerCards}
                gameOverEndRound={gameOverEndRound}
                unitsAndLocations={unitsAndLocations}
                topmostStuff={topmostStuff}
                gameIsActive={gameIsActive}
            />
            <ComputerCards
                computerCards={computerCards}
                ref={referenceComputerCards}
                gameOverEndRound={gameOverEndRound}
                unitsAndLocations={unitsAndLocations}
                topmostStuff={topmostStuff}
                gameIsActive={gameIsActive}
            />
            <ControlPanel
                unitsAndLocations={unitsAndLocations}
                dealSolitaireCards={dealSolitaireCards}
                dealSingleCards={dealSingleCards}
                gameIsActive={gameIsActive}
                changeGameIsActiveState={changeGameIsActiveState}
            />
        </View>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {

}

const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game)


export default ConnectedGame


// HELPER FUNCTIONS FOR COMPONENT ConnectedGame

const newCardsAreNeeded = (occupancyDataPlayer, occupancyDataComputer, topmostLeft, topmostRight, playerCards, computerCards) => {
    const visiblePlayerCardValues = getVisibleCards(occupancyDataPlayer, playerCards)
    const visibleComputerCardValues = getVisibleCards(occupancyDataComputer, computerCards)
    const playerCardsNeedNewDealing = newOneCardDealingIsNeeded(visiblePlayerCardValues, topmostLeft, topmostRight)
    if (!playerCardsNeedNewDealing) {
        return false
    }
    const computerCardsNeedNewDealing = newOneCardDealingIsNeeded(visibleComputerCardValues, topmostLeft, topmostRight)
    if (!computerCardsNeedNewDealing) {
        return false
    }
    return true
}

const newOneCardDealingIsNeeded = (visibleCardValues, leftValue, rightValue) => {
    for (let i = 0; i < visibleCardValues.length; i++) {
        const leftOK = valueIsOKforPlacingOntoAStack(visibleCardValues[i], leftValue)
        console.log('card', visibleCardValues[i], 'top', leftValue)
        if (leftOK) {
            return false
        }
        const rightOK = valueIsOKforPlacingOntoAStack(visibleCardValues[i], rightValue)
        console.log('card', visibleCardValues[i], 'top', rightValue)
        if (rightOK) {
            return false
        }
    }
    return true
}

const getVisibleCards = (occupancies, cards) => {
    let visibleCardValues = []
    const sets = [[0], [5,1], [9,6,2], [12,10,7,3], [14,13,11,8,4]]
    let i = 0
    while (i < 5) {
        let j = 0
        let look = true
        while (look && j < sets[i].length) {
            if (sets[i][j] < cards.length) {
                const indexOfCardAtThisPosition = occupancies[sets[i][j]]
                if (indexOfCardAtThisPosition !== -1) {
                    visibleCardValues.push(cards[indexOfCardAtThisPosition].value)
                    look = false
                }
            }
            j++
        }
        i++
    }
    return visibleCardValues
}

export const valueIsOKforPlacingOntoAStack = (newValue, currentTopmostValue) => {
    if (currentTopmostValue === 1) {
        if (newValue === 2 || newValue === 13) {
            return true
        }
    } else if (currentTopmostValue === 13) {
        if (newValue === 12 || newValue === 1) {
            return true
        }
    } else {
        if (newValue === currentTopmostValue + 1 || newValue === currentTopmostValue - 1) {
            return true
        } else {
            return false
        }
    }
}




