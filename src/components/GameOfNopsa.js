import React, { useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Game from './game/Game'
import SetUpGame from './setup/SetUpGame'
import Winner from './game/Winner'
import {  setGameRoundResults } from '../reducers/gameReducer'


const GameOfNopsa = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const scaleUnit = Math.min(screenWidth / 6, screenHeight /(6 * 1.7))
    const styles = getStyles(screenWidth, screenHeight)
    const spacing = (screenWidth - 6 * scaleUnit) / 2
    const unitsAndLocations = getUnitsAndLocations(scaleUnit, spacing)
    const gameIsOn = props.game.isOn

    const [winner, setWinner] = useState('none')

    const gameRoundOver = (theWinner, gameRoundOverPlayerStateData, gameRoundOverComputerStateData, topmostValues, cumulativeLeftStack, cumulativeRightStack) => {
        const computerCards = props.game.computerStack
        const playerCards = props.game.playerStack

        const computerLeftoverSolitaireCardIndexes = getLeftoverSolitaireCardIndexes(gameRoundOverComputerStateData)
        const playerLeftoverSolitaireCardIndexes = getLeftoverSolitaireCardIndexes(gameRoundOverPlayerStateData)
        const computerLeftoverDealingCards = getLeftoverDealingCards(gameRoundOverComputerStateData, computerCards.length)
        const playerLeftoverDealingCards = getLeftoverDealingCards(gameRoundOverPlayerStateData, playerCards.length)
        const cumulativeStackToComputer = getCumulativeStack(theWinner, 'computer', cumulativeLeftStack, cumulativeRightStack)
        const cumulativeStackToPlayer = getCumulativeStack(theWinner, 'player', cumulativeLeftStack, cumulativeRightStack)

        const newComputerCardIndexes = computerLeftoverSolitaireCardIndexes.concat(computerLeftoverDealingCards)
        const newPlayerCardIndexes = playerLeftoverSolitaireCardIndexes.concat(playerLeftoverDealingCards)
        const newComputerStack = getNewStack(newComputerCardIndexes, computerCards, cumulativeStackToComputer)
        const newPlayererStack = getNewStack(newPlayerCardIndexes, playerCards, cumulativeStackToPlayer)
        props.setGameRoundResults({ playerStack: newPlayererStack, computerStack: newComputerStack })
        setWinner(theWinner)
    }

    const continueToNextRound = () => {
        setWinner('none')
    }

    const GameWithRounds = () => {
        if (winner === 'none') {
            return <Game scaleUnit={scaleUnit} spacing={spacing} gameRoundOver={gameRoundOver} unitsAndLocations={unitsAndLocations}/>
        } else {
            return <Winner winner={winner} unitsAndLocations={unitsAndLocations} continueToNextRound={continueToNextRound}/>
        }
    }

    return (
        <View style={styles.screen}>
            {gameIsOn ?
                <GameWithRounds/>
                :
                <SetUpGame scaleUnit={scaleUnit}/>
            }
        </View>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    setGameRoundResults,
}

const ConnectedGameOfNopsa = connect(mapStateToProps, mapDispatchToProps)(GameOfNopsa)

export default ConnectedGameOfNopsa





const getStyles = (screenWidth, screenHeight) => {
    return StyleSheet.create({
        screen: {
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'green',
        },
    })
}


const getUnitsAndLocations = (unit, spacing) => {

    const leftDealingStackXY = {
        x: spacing + (1/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }
    const leftGamingStackXY = {
        x: spacing + (1/6 + 1 + 4/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }
    const rightGamingStackXY = {
        x: spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }
    const rightDealingStackXY = {
        x: spacing + (1/6 + 1 + 4/6 + 1 + 2/6 + 1 + 4/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }

    return {
        unit: unit,
        spacing: spacing,
        leftDealingStackXY: leftDealingStackXY,
        leftGamingStackXY: leftGamingStackXY,
        rightGamingStackXY: rightGamingStackXY,
        rightDealingStackXY: rightDealingStackXY,
        timing: {
            moveDurationDealing: 700,
            flipDurationDealing: 400,
            moveDurationComputerCardGaming: 200,
            flipDurationGaming: 200,
            movementFinalization: 50,
        },
    }
}



const getLeftoverSolitaireCardIndexes = (gameRoundOverStateData) => {
    return gameRoundOverStateData.occupancyData.filter(cardIndex => cardIndex !== -1)
}
const getLeftoverDealingCards = (gameRoundOverStateData, cardCount) => {
    const firstIndexNotDealt = gameRoundOverStateData.indexDealNext
    let leftovers = []
    for (let i = firstIndexNotDealt; i < cardCount; i++) {
        leftovers.push(i)
    }
    return leftovers
}
const getCumulativeStack = (winner, toWhom, cumulativeLeftStack, cumulativeRightStack) => {
    const winnerCumulativeStack = cumulativeLeftStack.length < cumulativeRightStack.length ? cumulativeLeftStack : cumulativeRightStack
    const loserCumulativeStack = cumulativeLeftStack.length < cumulativeRightStack.length ? cumulativeRightStack : cumulativeLeftStack
    if (toWhom === winner) {
        return winnerCumulativeStack
    }
    return loserCumulativeStack
}
const getNewStack = (indexes, oldStack, cumulativeStack) => {
    let leftoverCards = indexes.map(index => {
        return oldStack[index]
    })
    const newCards = leftoverCards.concat(cumulativeStack)
    return newCards
}





