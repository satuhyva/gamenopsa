import React from 'react'
import { View, Dimensions,  StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { setGameSettings } from '../../reducers/gameReducer'



const SetUpGame = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    // const cardWidthIfScreenWidthIsUsed = screenWidth / 6
    // const cardWidthIfScreenHeightIsUsed = screenHeight / ((0.5 + 1 + 0.75 + 1 + 0.75 + 1.5 + 0.5) * 1.7)
    // const cardWidth = Math.min(cardWidthIfScreenWidthIsUsed, cardWidthIfScreenHeightIsUsed)
    // const cardHeight = 1.7 * cardWidth
    // const spacing = (screenWidth - 6 * cardWidth) / 2

    const styles = getStyles(screenWidth, screenHeight)


    return (
        // <View style={styles.titleView}>
        //     <Text style={styles.titleText}>nopsa</Text>
        //     <Text style={styles.infoText}>a card game for those with skill, speed and luck</Text>
        // </View>
        <View style={styles.screen}>
            <Text>huhuuu</Text>
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



const getStyles = (screenWidth, screenHeight) => {
    return StyleSheet.create({
        screen: {
            alignItems: 'center',
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'green',
        },
        // titleView: {
        //     height: screenWidth / 10,
        //     alignItems: 'center',
        // },
        // titleText: {
        //     fontSize: screenWidth / 10,
        //     fontWeigth: 'bold',
        //     color: '#B9CC3F',
        //     fontFamily: 'Arial Black',
        // },
        // infoText: {
        //     fontSize: screenWidth / 20,
        //     color: '#B9CC3F',
        //     fontFamily: 'Arial',
        // },
    })
}



