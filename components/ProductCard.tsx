import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProductCardProps {
  name: string;
  type: string;
  rating: number;
}

export default function ProductCard({ name, type, rating }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>{type}</Text>
      <Text>Rating: {rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
