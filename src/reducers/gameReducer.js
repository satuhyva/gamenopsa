const initialState = { isOn: false }

const gameReducer = (state = initialState, action) => {

    switch (action.type) {
    case 'SET_GAME_SETTINGS':
        return action.data
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


export default gameReducer

