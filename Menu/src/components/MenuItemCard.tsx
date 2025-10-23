import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../types/types';

interface Props {
  item: MenuItem;
  onDelete: (id: string) => void;
}

export default function MenuItemCard({ item, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>Course: {item.course}</Text>
      <Text>R{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#ff5555',
    marginTop: 8,
    padding: 6,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center',
  },
});
