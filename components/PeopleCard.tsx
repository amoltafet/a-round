import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from '../components/Themed';
import { Switch, Card } from 'react-native-paper';
import { ImageBackground } from "react-native";

interface SettingsCardProps {
    name: string;
    cover?: String;
    bio?: string;
    job?: string;
}

const PeopleCard: React.FC<SettingsCardProps> = ({ name, cover, bio, job}) => {

    return (
        <View style={{
            minHeight: 250,
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderRadius: 10,
            width: 200,
            margin: 5,
        }}>
            <Card style={{flex: 1}}>

        <Card.Cover  source={{ uri: 'https://picsum.photos/300' }}
            style={{height: 300}}
        />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>{bio}</Text>
        </Card>
        </View>
    );
};


const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        position: 'absolute',
        bottom: 10,
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 30,
        color: 'white',
    },
    
};

export default PeopleCard;
