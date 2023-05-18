import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, View, CheckBox, Image, Text, FlatList, TextInput } from 'react-native'
import { getCharacter, getCharacterId, getLocation } from '../../components/api'
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';
import { debounce } from 'lodash';

const HomeScreen = ({navigation , route}) => {
  const [fetchResult, setFetchResult] = useState({ characters: [] })
  const [nameSearch, setNameSearch] = useState('')
  const { locationName, episodeName } = route.params || {}
  const [personagens, setPersonagens] = useState({chars: ''});

  // const { user, setUser } = useContext(UserContext);
  
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
    mainView:{
        justifyContent: 'center',
        padding: 10,
        backgroundColor: theme == true ? '#2872ad' : '#fff',
        borderRadius: "10px"
    },
    title:{
        display: 'flex',
        justifyContent:'center',
        fontSize: 18,
        textAlign: 'center',
        color: theme == true ? '#FFF' : '#000'
    }
})

  async function fetchNameData() {
    try {
      const results = await getCharacter({ name: nameSearch })
      console.log(info)
      setFetchResult(prevState => ({ ...prevState, characters: results }))

    } catch (error) {
      setFetchResult({ characters: [] })
    }
  }

  async function fetchIdData() {
    try {

        const response = await getCharacterId({ ids: personagens.chars })
        console.log(response)
        setFetchResult(prevState => ({ ...prevState, pageInfo: '', characters: response.data }))

    } catch (error) {
      console.log(error)
      setFetchResult({ pageInfo: {}, characters: [] })
    }
  }

  async function fetchPokeInfo() {
    try{
      const response = await getCharacter({info: info})
    } catch(error){

    }
  }

  function fetchCharacterDetails(name) {
    navigation.navigate('CharacterDetail', {name})
  }

  useEffect(() => {
    if ((route.params && route.params.characters && route.params.characters.length > 0)) {
      setPersonagens({ chars: route.params.characters });
    }
  }, [route.params]);

  useEffect(() => {
    if(personagens.chars && personagens.chars != "" && personagens.chars.length > 0){
      fetchIdData(personagens.chars)
    }
  }, [personagens])

  useEffect(() => {
    const debouncedFetchNameData = debounce(() => {
      fetchNameData(nameSearch);
    }, 1000);

    debouncedFetchNameData();

    return () => {
      debouncedFetchNameData.cancel();
    };
  }, [nameSearch]);
  
  const handleNameChange = (text) => {
    setNameSearch(text);
  };

  return (
    <View style={tema.bg}>
      <View style={{flexDirection: 'row', gap: "15px"  }}>
          <CheckBox value={theme} onValueChange={toggleTheme} />
          <Text style={{color: theme ? 'white' : 'black'}}>Modo Noturno</Text>
      </View>
      <View style={tema.mainView}>
        <TextInput
          style={[styles.textInput, styles.marginVertical]}
          onChangeText={handleNameChange}
          placeholder='Pesquise algum personagem'
          value={nameSearch}
        />
        {episodeName && <Text style={styles.title}>{episodeName}</Text>}
        {location && <Text style={styles.title}>{locationName}</Text>}
        <FlatList
          style={styles.marginVertical}
          data={fetchResult.characters}
          keyExtractor={({ name }) => name}
          renderItem={({ item: { name } }) => {
            return (
              <Text onPress={() => fetchCharacterDetails(name)} style={styles.characterContainer}>
                
                {/* <Image style={styles.characterImage} source={{ uri: image }} /> */}
                <View style={styles.txtBox}>
                  <Text><strong>{name}</strong></Text>
                  {/* <Text>{species}</Text> */}
                </View>
                
              </Text>
            )
          }}
        />  
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  characterContainer: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "204px",
    borderColor: "blue",
    overflow: "hidden",
    borderWidth: "2px",
    borderStyle: 'solid',
    borderRadius: "10px",
    margin: "auto",
    marginBottom: "15px",
    position: 'relative',

  },
  characterImage: {
    width: 200,
    height: 200,
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    height: 35,
    padding: 5,
    borderRadius: "6px",
    borderColor: "darkgreen",
    backgroundColor: "#FFF"
  },
  marginVertical: {
    marginVertical: 5
  },
  absolute: {
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "5px",
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
  green: {
    backgroundColor: "darkgreen",
  },
  gray: {
    backgroundColor: "gray",
  },
  red: {
    backgroundColor: "red",
  },
  txtBox: {
    width: "100%",
    padding: "10px",
    gap: "5px",
    backgroundColor: "#FFF",
  }
})

export default HomeScreen