import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import GamesScreen from '../screens/GamesScreen';
import AccountScreen from '../screens/AccountScreen';
import CustomHeader from '../components/CustomHeader';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#1F2937',
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: 'white',
        headerStyle: {
          backgroundColor: '#1F2937',
        },
        headerTintColor: 'white',
        header: ({ navigation, route, options }) => {
          const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : route.name;
          return <CustomHeader title={title} />;
        },
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen
        name="Instructions"
        component={InstructionsScreen}
        options={{
          tabBarLabel: 'Instructions',
        }}
      />
      <Tab.Screen
        name="Jeux"
        component={GamesScreen}
        options={{
          tabBarLabel: 'Jeux',
        }}
      />
      <Tab.Screen
        name="Compte"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Compte',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;