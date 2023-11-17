
import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Avatar {
  id: string;
  imageUrl: string;
}

interface Props {
  avatars: String[];
}

const StackedAvatars: React.FC<Props> = ({ avatars }) => {
  

  return (
    <View style={styles.avatarList}>
        <Avatar.Image size={35} source={{ uri: avatars[1] }} style={styles.avatar} />
        <Avatar.Image size={35} source={{ uri: avatars[2] }} style={styles.avatar} />
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
  avatarList: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      height: 35,
      width: 35,
      marginRight: -21,
      backgroundColor: 'gray',
      borderRadius: 25,
      borderWidth: 2,
      borderColor: 'white',
      shadowColor: '#999',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
    },
  });

export default StackedAvatars;
