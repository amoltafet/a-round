import { Link, Tabs, Navigator, useNavigation } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigator = useNavigation<Navigator>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
        <Tabs.Screen
        name='messages'
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbox-ellipses-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'A-Round',
          tabBarIcon: ({ color }) => <TabBarIcon name="at-circle" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="information-circle-outline"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          headerLeft: () => (
            <Pressable onPress={() => navigator.navigate('settings')}>
            <Ionicons
              name="settings-outline"
              style={{ marginLeft: 15 }}
              size={25}
            />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigator.navigate('notifs')}>
            <Ionicons
              name="notifications-outline"
              style={{ marginRight: 15 }}
              size={25}
            />
            </Pressable>
              
          ),
            

        }}
      />

    </Tabs>
  );
}
