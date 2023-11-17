import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { Avatar, Badge} from "react-native-paper";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Map from "./map";
import Profile from "./profile";
import Notifs from "./notifs";
import Settings from "./settings";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated } from "react-native";


function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={24}  {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const Tab = createMaterialTopTabNavigator();
  // catch error or loading state sending onAnimatedValueUpdate

  const av = new Animated.Value(0);
  av.addListener(() => {return});


  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="map"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "grey",
        tabBarIndicatorContainerStyle: {
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background: Colors.light.background,
          borderRadius: 20,
          marginBottom: 25,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tint,
        }, 
      
        
        
      }}
    >
      <Tab.Screen
        name="map"
        options={{
          title: "Map",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-marker-account" color={color} />
          ),
         
          
        }} 
        component={Map}

        />
       <Tab.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
           
              <Avatar.Image
                size={24}
                source={{
                  uri: "https://randomuser.me/api/portraits/men/1.jpg",
                }}
              />
          ),
         
        }}
        component={Profile}

      />
    
      <Tab.Screen
        name="notifs"
        options={{
          title: "Notifications",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bell-outline" color={color} />
          ),
          
         
        }}
        component={Notifs}

      />
    
      <Tab.Screen
        name="settings"
        options={{
          title: "Settings & Privacy",
          tabBarLabel: "",
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
         
        }}
        component={Settings}
      />
    </Tab.Navigator>
    
   
  );
}
