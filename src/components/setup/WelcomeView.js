import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native'


const WelcomeView = ({ startSetting, scaleUnit }) => {

    const styles = getStyles(scaleUnit)

    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }
    const fadeOut = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 1000,
        }).start()
        setTimeout(() => {
            startSetting()
        }, 1000)
    }

    return (
        <View>
            <Animated.View style={animatedVisibility}>
                <View style={styles.contents}>
                    <Text style={styles.titleText}>nopsa</Text>
                    <Text style={styles.infoText}>a card game for those with</Text>
                    <Text style={styles.infoText}> skill, speed and luck</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>feel like playing?</Text>
                    <TouchableOpacity onPress={fadeOut} style={styles.buttonView}>
                        <Text style={styles.buttonText}>setup a new game</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}


const getStyles = (scaleUnit) => {
    return StyleSheet.create({
        contents:{
            alignItems: 'center',
            marginTop: scaleUnit / 2,
        },
        titleText: {
            fontSize: scaleUnit / 1.5,
            fontWeigth: 'bold',
            color: '#B9CC3F',
            fontFamily: 'Arial Black',
        },
        infoText: {
            fontSize: scaleUnit / 2.5,
            color: '#B9CC3F',
            fontFamily: 'Arial',
        },
        spacer: {
            height: scaleUnit / 2,
        },
        buttonView: {
            backgroundColor: '#B9CC3F',
            padding: scaleUnit / 5,
            borderRadius: 8,
            marginTop: scaleUnit / 5,
        },
        buttonText: {
            color: 'green',
            fontFamily: 'Arial',
            fontSize: scaleUnit / 2.5,
        },
    })
}


export default WelcomeView

