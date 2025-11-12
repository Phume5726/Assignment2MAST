import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuItem } from '../types/types';
import MenuItemCard from '../components/MenuItemCard';
import { loadMenu, saveMenu } from '../utilities/storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [averages, setAverages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    (async () => {
      const loadedMenu = await loadMenu();
      setMenu(loadedMenu);
    })();
  }, []);

  useEffect(() => {
    calculateAverages();
  }, [menu]);

  const calculateAverages = () => {
    const courseTotals: any = {};
    const courseCounts: any = {};

    // using for...of and for...in
    for (const item of menu) {
      if (!courseTotals[item.course]) {
        courseTotals[item.course] = 0;
        courseCounts[item.course] = 0;
      }
      courseTotals[item.course] += item.price;
      courseCounts[item.course] += 1;
    }

    const avg: any = {};
    for (const c in courseTotals) {
      avg[c] = (courseTotals[c] / courseCounts[c]).toFixed(2);
    }
    setAverages(avg);
  };

  const handleDelete = async (id: string) => {
    const updatedMenu = menu.filter(item => item.id !== id);
    setMenu(updatedMenu);
    await saveMenu(updatedMenu);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef’s Menu</Text>
      <Text>Total Items: {menu.length}</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} onDelete={handleDelete} />}
      />

      <View style={styles.averages}>
        <Text style={styles.avgTitle}>Average Price per Course</Text>
        {Object.entries(averages).map(([course, avg]) => (
          <Text key={course}>{course}: R{avg}</Text>
        ))}
      </View>

      <Button title="Add Menu Item" onPress={() => navigation.navigate('AddItem')} />
      <Button title="Filter by Course" onPress={() => navigation.navigate('Filter')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 20 },
  averages: { marginVertical: 12 },
  avgTitle: { fontWeight: 'bold', marginBottom: 4 },
});