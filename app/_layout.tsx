import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '../hooks/useColorScheme';
import HomeScreen from '../components/screens/HomeScreen';
import CatalogScreen from '../components/screens/CatalogScreen';
import ProfileScreen from '../components/screens/ProfileScreen';
import ScanScreen from '../components/screens/ScanScreen';
import ProductDetails from '../components/screens/ProductDetails'; // Verifica que esta ruta sea correcta

// Define los tipos de los parámetros para la navegación
type RootStackParamList = {
  Home: undefined;
  Catalog: undefined;
  Profile: undefined;
  Scan: undefined;
  ProductDetails: { productId: string }; // Asegúrate de que `productId` es un string
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Aseguramos que la splash screen no desaparezca hasta que todo esté cargado
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Usamos el esquema de colores del sistema (oscuro o claro)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Oculta la splash screen una vez que las fuentes están cargadas
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Muestra un splash screen mientras se cargan las fuentes
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"> {/* Asegúrate de que "Home" sea la pantalla inicial */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Catalog" component={CatalogScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }} // Título personalizado para la pantalla de detalles del producto
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
