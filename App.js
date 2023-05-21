import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { ThemeProvider } from './src/components/ThemeContext'
import { useState } from 'react'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import SearchScreen from './src/screens/SearchScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState('')

  return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="">
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
  )
}
