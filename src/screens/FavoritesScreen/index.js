import React, { useEffect, useState } from 'react'
import { StyleSheet, View, CheckBox, Image, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import { getSinglePoke  } from '../../components/api'
import DetailScreen from '../DetailScreen';
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation, route }) => {
  const [fetchResult, setFetchResult] = useState({ characters: [] })
  const [nameSearch, setNameSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false);

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
    mainView: {
      justifyContent: 'center',
      padding: 10,
      backgroundColor: theme == true ? '#2872ad' : '#fff',
      borderRadius: 10,
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: 18,
      textAlign: 'center',
      color: theme == true ? '#FFF' : '#000',
      fontWeight: '900',
      marginTop: '10px',
      marginBottom: '10px'
    }
  })
  const getCurrentIds = async () => {
    try {
      const currentIds = await AsyncStorage.getItem('currentIds');
  
      if (currentIds) {
        return JSON.parse(currentIds);
      }
      
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  async function fetchNameData() {
    const ids = await getCurrentIds();
  
    for (const id of ids) {
      try {
        const result = await getSinglePoke(id);
        const { data } = result; 
        setFetchResult(prevState => {
          const updatedCharacters = [...prevState.characters, data];
          return { characters: updatedCharacters };
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  

  useEffect(() => {
    fetchNameData()
  }, []);

  function fetchCharacterDetails(poke) {
    navigation.navigate('DetailScreen', { poke })
  }

  return (
    <View style={tema.bg}>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <CheckBox value={theme} onValueChange={toggleTheme} />
        <Text style={{ color: theme ? 'white' : 'black' }}>Modo Noturno</Text>
      </View>
      <View style={tema.mainView}>
        <Text style={tema.title}>Pokemons Favoritos</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.gridContainer}>
            {fetchResult.characters.map((item) => (
              <TouchableHighlight
                key={item.id}
                onPress={() => fetchCharacterDetails(item)}
                underlayColor="transparent"
                style={styles.characterContainer}
              >
                <View style={styles.fullDiv}>
                  <Image style={styles.characterImage} source={{ uri: item.sprites.front_default }} />
                  <View style={styles.txtBox}>
                    <Text>
                      <strong>{item.id} - {item.name}</strong>
                    </Text>
                  </View>
                  <View style={styles.pokeback}>
                    <View style={styles.redBg}></View>
                    <View style={styles.blackBg}></View>
                    <View style={styles.whiteBg}></View>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
    gap: '15px'
  },
  characterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '250px',
    height: '250px',
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: '50%',
    marginBottom: 15,
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden',
    margin: 'auto'
  },
  characterImage: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2
  },
  txtBox: {
    width: '100%',
    padding: 10,
    gap: 5,
    backgroundColor: '#FFF',
    zIndex: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  pokeback: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
  },
  fullDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: 'center',
    position: 'relative'
  },
  redBg:{
    width: '100%',
    height: '48%',
    backgroundColor: 'red'
  },
  whiteBg:{
    width: '100%',
    height: '48%',
    backgroundColor: 'white'
  },
  blackBg:{
    width: "100%",
    height: '6%',
    backgroundColor: 'black'
  }
})

export default FavoritesScreen;
