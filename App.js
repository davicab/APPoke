import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { ThemeProvider } from './src/components/ThemeContext'
import { useState } from 'react'
import HomeScreen from './src/screens/HomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState('')

  return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="">
              <Stack.Screen name="home" component={HomeScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
  )
}
