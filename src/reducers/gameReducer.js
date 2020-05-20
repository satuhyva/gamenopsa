const initialState = { isOn: false }

const gameReducer = (state = initialState, action) => {

    switch (action.type) {
    case 'SET_GAME_SETTINGS':
        return action.data
    case 'SET_GAMEROUND_RESULTS':
        return { ...state, playerStack: action.data.playerStack, computerStack: action.data.computerStack }
    default:
        return state
    }

}

export const setGameSettings = (settings) => {
    return {
        type: 'SET_GAME_SETTINGS',
        data: settings,
    }
}

export const setGameRoundResults = (results) => {
    return {
        type: 'SET_GAMEROUND_RESULTS',
        data: results,
    }
}


export default gameReducer

