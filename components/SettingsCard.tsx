import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from '../components/Themed';
import { Switch , Chip} from 'react-native-paper';

interface SettingsCardProps {
    title: string;
    subTitle?: string;
    icon?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, subTitle, icon }) => {
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
        }}>
            <Ionicons name={icon} size={24} color="black" style={{margin: 10}}/>
            <View style={{flex: 1, margin: 5}}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>{title}</Text>
                <Text style={{fontSize: 12, color: 'grey'}}>{subTitle}</Text>
             </View>
            <Switch value={toggleState} onValueChange={handleToggle} 
                style={{margin: 10}}
            />              

        </View>
    );
};

export default SettingsCard;
