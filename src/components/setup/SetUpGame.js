import React from 'react'
import { View, Dimensions,  StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { setGameSettings } from '../../reducers/gameReducer'



const SetUpGame = (props) => {


    return (
        <View >
            <Text>huhuuu SETUPPOII</Text>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

const ConnectedSetUpGame = connect(mapStateToProps, mapDispatchToProps)(SetUpGame)

export default ConnectedSetUpGame





