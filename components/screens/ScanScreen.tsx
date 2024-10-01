import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firestore } from '../../config/firebaseConfig'; // Asegúrate de que esta ruta sea correcta

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const productData = {
      barcode: data,
      name: "Nombre del producto",
      type: "Tipo de producto",
      rating: 20,
      description: "Descripción del producto",
      imageUrl: "URL de la imagen del producto",
    };

    const productId = data;

    // Agregar el producto a Firestore
    firestore.collection('products')
      .doc(productId)
      .set(productData)
      .then(() => {
        Alert.alert("Producto agregado a Firestore");
      })
      .catch((error) => {
        Alert.alert("Error al agregar el producto: ", error.message);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: '100%', height: '80%' }}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  // Agrega aquí tus estilos si es necesario
});
