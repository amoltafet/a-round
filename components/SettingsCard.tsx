import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from '../components/Themed';
import { Switch } from 'react-native-paper';
import Colors from "../constants/Colors";

interface SettingsCardProps {
    title: string;
    subTitle?: string;
    icon?: string;
    toggle?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, subTitle, icon, toggle }) => {
    const [toggleState, setToggleState] = useState(false);
    const handleToggle = () => {
        setToggleState(!toggleState);
    };

    return (
        <View style={{
            flexDirection: 'row',
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            margin: 3,
        }}>
            <Ionicons name={icon} size={24} color="black" style={{margin: 10}}/>
            <View style={{flex: 1, margin: 5}}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>{title}</Text>
                <Text style={{fontSize: 12, color: 'grey'}}>{subTitle}</Text>
             </View>
             {
                toggle ? (
                    <Switch value={toggleState} onValueChange={handleToggle} 
                        style={{margin: 10}}
                    />              
                ) : (
                    <Ionicons name="chevron-forward" size={24} color="black" style={{margin: 10}}/>
                )
             }            

        </View>
    );
};

export default SettingsCard;
