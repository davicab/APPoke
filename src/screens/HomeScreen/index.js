import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, View, CheckBox, Image, Text, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native'
import { getCharacter } from '../../components/api'
import DetailScreen from '../DetailScreen';
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';

const HomeScreen = ({ navigation, route }) => {
  const [fetchResult, setFetchResult] = useState({ characters: [] })
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
      color: theme == true ? '#FFF' : '#000'
    }
  })

  async function fetchNameData() {
    setIsLoading(true)
    try {
      const results = await getCharacter("");
      let charactersData;
      if (results.length > 1) {
        charactersData = results.map(({ data }) => data);
      } else {
        charactersData = [results.data]
      }
      setFetchResult({ characters: charactersData });
    } catch (error) {
      setFetchResult({ characters: [] });
    } finally {
      setIsLoading(false);
    }
  }

  function fetchCharacterDetails(poke) {
    navigation.navigate('DetailScreen', { poke })
  }

  function fetchSearch() {
    navigation.navigate('SearchScreen')
  }

  useEffect(() => {
    fetchNameData();
  }, []);

  return (
    <View style={tema.bg}>
      <View style={tema.mainView}>
        {isLoading ? (
          <View>
            <Text style={tema.title}>Aguarde enquanto uma lista de 50 pokemons aleatorios eh gerada, demora um pouquinho ;)</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (          
          <View style={styles.gridContainer}>
            {fetchResult.characters.map(item => (
              <TouchableHighlight
                key={item.id}
                onPress={() => fetchCharacterDetails(item)}
                underlayColor="transparent"
                style={styles.characterContainer}
              >
                <View style={styles.fullDiv}>
                  <Image style={styles.characterImage} source={{ uri: item.sprites.front_default }} />
                  <View style={styles.txtBox}>
                    <Text><strong>{item.id} - {item.name}</strong></Text>
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
    overflow: 'hidden'
  },
  characterImage: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    height: 35,
    padding: 5,
    borderRadius: 6,
    borderColor: 'darkgreen',
    backgroundColor: '#FFF',
  },
  marginVertical: {
    marginVertical: 5,
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
  },
  searchBox: {
    width: "50px", height: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#cecece',
    padding: '5px',
    borderRadius: 8
  }
})

export default HomeScreen;
