import { StatusBar, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { ThemeProvider } from './src/components/ThemeContext'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import SearchScreen from './src/screens/SearchScreen'
import FavoritesScreen from './src/screens/FavoritesScreen'
import SettingsScreen from './src/screens/SettingsScreen'

const Stack = createNativeStackNavigator()

export default function App() {

  return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home" 
          
          screenOptions={({ navigation }) => ({
            headerTitleAlign: 'left',
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center', gap: '10px', marginRight: '10px'}}>
                <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
                  <Image style={{width: "32px", height: "32px", position: 'relative'}} source={ require('/assets/images/Heart-fill.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate('SettingsScreen')}
                style={styles.searchBox}>
                  <Image style={{width: "32px", height: "32px", position: 'relative'}} source={require('/assets/images/Settings.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate('SearchScreen')}
                style={styles.searchBox}>
                  <Image style={{width: "32px", height: "32px", position: 'relative'}} source={require('/assets/images/search.svg')} />
                </TouchableOpacity>
              </View>
            ),
          })}
        
          
          >
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
  )
}
const styles = StyleSheet.create({
  
  searchBox: {
    width: "50px", height: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#cecece',
    padding: '5px',
    borderRadius: 8,
  }
})