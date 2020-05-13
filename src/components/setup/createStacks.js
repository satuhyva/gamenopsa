import shuffle from 'shuffle-array'

export const createStacks = () => {
    const stack = []
    for (let j = 1; j < 5; j++) {

        for (let i = 1; i < 14; i++) {
            stack.push({ suit: j, value: i })
        }

    }

    const stackShuffled = shuffle(stack)

    return [ stackShuffled.slice(0, 26), stackShuffled.slice(26) ]
}

