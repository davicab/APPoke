import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Switch, } from 'react-native'
import { getCharacter, getLocation } from '../../components/api'
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SettingsScreen = ({navigation,route }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const tema = StyleSheet.create({
    bg: {
        padding: 10,
        height: '100%',
        transition: "0.5s",
        backgroundColor: theme == true ? '#002746' : '#fff',
        overflow: "scroll",
    },
    charInfo:{
        backgroundColor: theme == true ? '#2872ad' : '#fff',
        justifyContent: 'center',
        padding: "12px",
        alignItems: "center",
        gap: "5px",
        borderRadius: "12px"
    },
    title:{
        display: 'flex',
        justifyContent:'center',
        fontSize: 18,
        textAlign: 'center',
        color: theme == true ? '#FFF' : '#000'
    },
  })

  return (
    <View style={tema.bg}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: theme ? 'white' : 'black', marginRight: 10 }}>Modo Noturno</Text>
            <Switch
                style={styles.switch}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbTintColor={theme ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={theme}
                onValueChange={toggleTheme}
            />
        </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

})


export default SettingsScreen
