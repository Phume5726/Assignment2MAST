import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from '../types/types';
import { loadMenu } from '../utilities/storage';

export default function FilterScreen() {
  const [course, setCourse] = useState('Starters');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filtered, setFiltered] = useState<MenuItem[]>([]);

  useEffect(() => {
    (async () => {
      const menuData = await loadMenu();
      setMenu(menuData);
    })();
  }, []);

  useEffect(() => {
    const result: MenuItem[] = [];
    let i = 0;
    // using while loop
    while (i < menu.length) {
      if (menu[i].course === course) {
        result.push(menu[i]);
      }
      i++;
    }
    setFiltered(result);
  }, [course, menu]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>
      <Picker selectedValue={course} onValueChange={setCourse}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>R{item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 20 },
  card: { padding: 8, marginVertical: 4, borderBottomWidth: 1, borderColor: '#ddd' },
  name: { fontWeight: 'bold' },
});