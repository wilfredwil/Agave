import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../ProductCard';  // Asegúrate de que la ruta sea correcta

const products = [
  { id: '1', name: 'Tequila Añejo', type: 'Añejo', rating: 4.5 },
  { id: '2', name: 'Mezcal Espadín', type: 'Joven', rating: 4.2 },
];

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard name={item.name} type={item.type} rating={item.rating} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
