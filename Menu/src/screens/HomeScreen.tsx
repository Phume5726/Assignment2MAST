import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MenuItem } from '../types/types';
import MenuItemCard from '../components/MenuItemCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const route = useRoute<HomeScreenRouteProp>();
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (route.params && (route.params as any).newItem) {
      const newItem = (route.params as any).newItem as MenuItem;
      setMenu((prevMenu) => [...prevMenu, newItem]);
    }
  }, [route.params]);

  const handleDelete = (id: string) => {
    setMenu((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef’s Menu</Text>
      <Text>Total Menu Items: {menu.length}</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} onDelete={handleDelete} />}
      />

      <Button title="Add New Dish" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
});
