import React, { useState } from 'react'
import { View } from 'react-native'
import WelcomeView from './WelcomeView'
import SelectionView from './SelectionView'


const SetUpGame = ({ scaleUnit }) => {

    const [settingNew, setSettingNew] = useState(false)

    const startSettingUpNewGame = () => {
        setSettingNew(true)
    }

    return (
        <View>
            {settingNew ?
                <SelectionView  scaleUnit={scaleUnit}/>
                :
                <WelcomeView startSetting={startSettingUpNewGame} scaleUnit={scaleUnit}/>
            }
        </View>
    )
}

export default SetUpGame






