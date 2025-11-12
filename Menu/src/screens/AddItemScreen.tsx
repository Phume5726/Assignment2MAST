import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuItem } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { saveMenu, loadMenu } from '../utilities/storage';

type AddItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddItem'>;

interface Props {
  navigation: AddItemScreenNavigationProp;
}

export default function AddItemScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name || !description || !price) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newItem: MenuItem = {
      id: uuidv4(),
      name,
      description,
      course,
      price: parseFloat(price),
    };

    const menu = await loadMenu();
    const updatedMenu = [...menu, newItem];
    await saveMenu(updatedMenu);

    Alert.alert('Menu item added successfully!');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Select Course</Text>
      <Picker selectedValue={course} onValueChange={setCourse}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Button title="Add Dish" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 8,
  },
});
