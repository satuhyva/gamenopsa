
export const getPlayerCardStartLocation = (scalingUnit, spacing) => {
    const positionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6 + 1 + 4/6) * scalingUnit
    const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
    return { x: positionX, y: positionY }
}

export const getCardFlipStateAfterDealing = (cardIndex, cardCount) => {
    let flip = false
    switch (cardIndex) {
    case 0: case 5: case 9: case 12: case 14:
        flip = true
        break
    case 1: case 2: case 3: case 4:
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    case 6: case 7: case 8:
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    case 10: case 11:
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    case 13:
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    default:
        break
    }
    if (cardIndex > 14) {
        flip = true
    }
    return flip
}


export const getPlayerCardLocationAfterDealing = (cardIndex, scalingUnit, spacing, cardCount) => {

    if (cardIndex < 15) {
        return getPlayerCardSolitaireLocation(cardIndex, scalingUnit, spacing)
    } else {
        const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
        const toLeftOrRightStack = toLeftOrRightGameStackInSingleCardDealing(cardIndex, cardCount)
        if (toLeftOrRightStack === 'right') {
            const rightPackPositionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scalingUnit
            return { x: rightPackPositionX, y: positionY }
        } else {
            const leftPackPositionX = spacing + (1/6 + 1 + 4/6) * scalingUnit
            return { x: leftPackPositionX, y: positionY }
        }
    }

}


export const toLeftOrRightGameStackInSingleCardDealing = (cardIndex, playerCardCount) => {
    const countOfPlayerCardsToDeal = playerCardCount - 15 > 0 ? playerCardCount - 15 : 0
    const computerCardCount = 52 - playerCardCount
    const countOfComputerCardsToDeal = computerCardCount - 15 > 0 ? computerCardCount - 15 : 0
    const numberOfBothPlayersDealCards = Math.min(countOfPlayerCardsToDeal, countOfComputerCardsToDeal)
    if (cardIndex < 15 + numberOfBothPlayersDealCards) {
        return 'right'
    } else {
        if (computerCardCount % 2 === 0 && cardIndex% 2 === 0) {
            return 'right'
        } else {
            return 'left'
        }
    }
}


const getPlayerCardSolitaireLocation = (cardIndex, scalingUnit, spacing) => {

    const unitHeight = 1.7 * scalingUnit
    const origoY =  (0.5 + 1.5 + 0.75 + 1.0 + 0.75) * unitHeight

    let positionX

    switch (cardIndex) {
    case 0:
        positionX = spacing + 1 / 6 * scalingUnit
        break
    case 1: case 5:
        positionX = spacing + (2 / 6  + 1)* scalingUnit
        break
    case 2: case 6: case 9:
        positionX = spacing +  (3 / 6 + 2) * scalingUnit
        break
    case 3: case 7: case 10: case 12:
        positionX = spacing +  (4 / 6 + 3) * scalingUnit
        break
    default:
        positionX = spacing +  (5 / 6 + 4) * scalingUnit
    }

    let positionY

    switch (cardIndex) {
    case 14:
        positionY = origoY + (4 * 0.125) * unitHeight
        break
    case 12: case 13:
        positionY = origoY + (3 * 0.125) * unitHeight
        break
    case 9: case 10: case 11:
        positionY = origoY + (2 * 0.125) * unitHeight
        break
    case 5: case 6: case 7: case 8:
        positionY = origoY + (1 * 0.125) * unitHeight
        break
    default:
        positionY = origoY
    }

    return { x: positionX, y: positionY }
}

export const whatStackWasReleasedOn = (releaseX, releaseY, scaleUnit, spacing) => {
    const wasReleasedOnLeft = wasReleasedOnLeftStack(releaseX, releaseY, scaleUnit, spacing)
    const wasReleasedOnRight = wasReleasedOnRightStack(releaseX, releaseY, scaleUnit, spacing)
    if (wasReleasedOnLeft) {
        return 'left'
    } else if (wasReleasedOnRight) {
        return 'right'
    } else {
        return 'none'
    }
}

const wasReleasedOnRightStack = (releaseX, releaseY, scaleUnit, spacing) => {
    const gamingStackRightX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit
    const gamingStackRightY = (0.5 + 1.5 + 0.75) * scaleUnit * 1.7
    if (!(releaseX > gamingStackRightX && releaseX < gamingStackRightX + scaleUnit)) {
        return false
    }
    if (!(releaseY > gamingStackRightY && releaseY < gamingStackRightY + scaleUnit * 1.7)) {
        return false
    }
    return true
}

const wasReleasedOnLeftStack = (releaseX, releaseY, scaleUnit, spacing) => {
    const gamingStackLeftX = spacing + (1/6 + 1 + 4/6) * scaleUnit
    const gamingStackLeftY = (0.5 + 1.5 + 0.75) * scaleUnit * 1.7
    if (!(releaseX > gamingStackLeftX && releaseX < gamingStackLeftX + scaleUnit)) {
        return false
    }
    if (!(releaseY > gamingStackLeftY && releaseY < gamingStackLeftY + scaleUnit * 1.7)) {
        return false
    }
    return true
}


export const valueIsOKforPlacingOntoStack = (whatStack, topmostLeft, topmostRight, newCard) => {
    const currentTopmostValue = whatStack === 'left' ? topmostLeft.value : topmostRight.value
    const newValue = newCard.value
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

export const getIndexOfPossibleCardBelow = (cardIndex) => {
    let index
    switch (cardIndex) {
    case 14:
        index = 13
        break
    case 13:
        index =  11
        break
    case 12:
        index =  10
        break
    case 11:
        index =  8
        break
    case 10:
        index =  7
        break
    case 9:
        index =  6
        break
    case 8:
        index =  4
        break
    case 7:
        index =  3
        break
    case 6:
        index =  2
        break
    case 5:
        index =  1
        break
    default:
        index =  -1
    }
    return index
}