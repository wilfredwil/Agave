import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../config/firebaseConfig'; // Asegúrate de que la ruta sea correcta

// Tipado del producto (opcional, pero recomendado)
type Product = {
  id: string;
  name: string;
  type: string;
  rating: number;
  description: string;
  imageUrl: string;
};

export default function CatalogScreen() {
  const [productsList, setProductsList] = useState<Product[]>([]); // Usamos tipado para productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await firestore.collection('products').get();
        const products = productsCollection.docs.map(doc => ({
          id: doc.id, // Usamos el ID del documento como el identificador único
          ...doc.data(),
        })) as Product[]; // Tipamos explícitamente como un array de productos
        setProductsList(products);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} // Se pasa directamente el objeto productId sin usar "as never"
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Rating: {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});