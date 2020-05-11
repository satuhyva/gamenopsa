import React, { useState } from 'react'
import { View, Dimensions,  StyleSheet } from 'react-native'
import WelcomeView from './WelcomeView'
import SelectionView from './SelectionView'


const SetUpGame = () => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const scaleUnit = Math.min(screenWidth / 6, screenHeight /(6 * 1.7))

    const styles = getStyles(screenWidth, screenHeight)
    const [settingNew, setSettingNew] = useState(false)

    const startSettingUpNewGame = () => {
        setSettingNew(true)
    }

    return (
        <View style={styles.screen}>
            {settingNew ?
                <SelectionView  scaleUnit={scaleUnit}/>
                :
                <WelcomeView startSetting={startSettingUpNewGame} scaleUnit={scaleUnit}/>
            }
        </View>
    )
}

export default SetUpGame


const getStyles = (screenWidth, screenHeight) => {
    return StyleSheet.create({
        screen: {
            alignItems: 'center',
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'green',
        },
    })
}




