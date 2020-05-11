
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import GameOfNopsa from './components/GameOfNopsa'

const store = createStore(rootReducer)

const App = () => {
    return (
        <Provider store={store}>
            <GameOfNopsa/>
        </Provider>
    )
}

export default App
