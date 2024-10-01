import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { firestore } from '../../config/firebaseConfig'; // Importamos firestore desde firebaseConfig

type ProductDetailsProps = {
  route: {
    params: {
      productId: string;
    };
  };
};

export default function ProductDetails({ route }: ProductDetailsProps) {
  const { productId } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await firestore.collection('products').doc(productId).get();
        if (productDoc.exists) {
          setProduct(productDoc.data());
        } else {
          Alert.alert('Error', 'No se encontró el producto');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        Alert.alert('Error', 'Hubo un problema al recuperar el producto. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>No se encontraron datos del producto.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text>Type: {product.type}</Text>
      <Text>Rating: {product.rating}</Text>
      <Text>Description: {product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
