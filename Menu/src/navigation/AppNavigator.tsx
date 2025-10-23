import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import { MenuItem } from '../types/types';

export type RootStackParamList = {
  Home: { newItem?: MenuItem } | undefined;
  AddItem: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Add Menu Item' }} />
    </Stack.Navigator>
  );
}
