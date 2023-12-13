import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsCard from '../components/SettingsCard';
import Colors from '../constants/Colors';
import { SearchBar } from 'react-native-elements';
import mockUsers from './mock/MockData';
import { useState } from 'react';
import UserCard from '../components/UserCard';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function Search() {
  const [users, setUsers] = useState([...mockUsers])
  const [search, setSearch] = useState("")
  const colorScheme = useColorScheme();
  const updateSearch = (search: String) => {
    setSearch(search);
   // filter based on name and username 
    setUsers(users.filter((user) => user.name.includes(search) || user.username.includes(search)))
    
  };

  const cancelSearch = () => {
    setSearch("")
    setUsers([...mockUsers])
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 0,
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      left: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        onCancel={() => cancelSearch()} 
        value={search}
        platform='ios'
        containerStyle={{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
    />
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    {
      users.map((user) => {
        return (
          <UserCard name={user.name} username={user.username} avatar={user.avatar} arrow 
            link='/person' 
            key={user.id}
          />
        )
      })
    }
    </ScrollView>
    </View>
  );
}


