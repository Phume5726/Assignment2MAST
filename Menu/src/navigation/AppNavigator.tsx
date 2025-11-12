import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import FilterScreen from '../screens/FilterScreen';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>
  );
}
