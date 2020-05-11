import React, { useState, useImperativeHandle } from 'react'
import { View, StyleSheet } from 'react-native'
import Stack from './Stack'


const StackSelection = React.forwardRef((props, ref) => {

    const scaleUnit = props.scaleUnit
    const styles = getStyles()

    const [selectedStack, setSelectedStack] = useState(0)
    const changedSelection = (id) => {
        setSelectedStack(id)
    }

    const getSelectedStack = () => {
        if (selectedStack === 0) {
            return { player: 0, computer: 1 }
        } else {
            return { player: 1, computer: 0 }
        }
    }
    useImperativeHandle(ref, () => {
        return { getSelectedStack }
    })

    const borderColorStack1 = selectedStack === 0 ? { borderColor: '#B9CC3F' } : { borderColor: 'green' }
    const borderColorStack2 = selectedStack === 1 ?  { borderColor: '#B9CC3F' } : { borderColor: 'green' }


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Stack displayColor={borderColorStack1} number={0} selectStack={changedSelection} scaleUnit={scaleUnit}/>
                <View style={{ width: 30 }}/>
                <Stack displayColor={borderColorStack2} number={1} selectStack={changedSelection} scaleUnit={scaleUnit}/>
            </View>
        </View>
    )
})

export default StackSelection


const getStyles = (scaleUnit) => {
    return  StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        instructionText: {
            fontSize: scaleUnit / 2.5,
            color: '#B9CC3F',
            fontFamily: 'Arial',
            marginBottom: scaleUnit / 3,
        },
    })
}
