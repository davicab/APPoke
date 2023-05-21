import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, CheckBox, Image, TouchableOpacity } from 'react-native'
import { getCharacter, getLocation } from '../../components/api'
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DetailScreen = ({navigation,route }) => {
  const { poke } = route.params
  const pokeId = poke.id
  const { theme, setTheme } = useContext(ThemeContext);
  const [heartClicked, setHeartClicked] = useState(false);
  
  const [location, setLocation] = useState({loc: []})

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
    }
  })

  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    unknown: '#FFF',
    shadow: '#000'
  };


  async function fetchLoc() {
    try {
      const result = await getLocation(pokeId);
      let locData = [];
  
      if (result.data.length > 0) {
        locData = result.data.map((encounter) => encounter.location_area.name);
      }
      setLocation({ loc: locData });
    } catch (error) {
      console.log(error);
      setLocation({ loc: "" });
    }
  }
  
  
  useEffect(() =>{
    fetchLoc()
  }, [])

  const storeCurrentId = async (id) => {
    try {
      await AsyncStorage.setItem('currentId', id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleHeartPress = () => {
    storeCurrentId(pokeId);
    setHeartClicked(true);
  };

  return (
    <View style={tema.bg}>
      <View style={{flexDirection: 'row', gap: "15px"  }}>
        <CheckBox value={theme} onValueChange={toggleTheme} />
        <Text style={{color: theme ? 'white' : 'black'}}>Modo Noturno</Text>
      </View>
      <View style={tema.charInfo}>
        <View style={styles.characterContainer}>
            <View style={styles.fullDiv}>
              <Image style={styles.characterImage} source={poke.sprites.front_default} />
              <View style={styles.pokeback}>
                  <View style={styles.redBg}></View>
                  <View style={styles.blackBg}></View>
                  <View style={styles.whiteBg}></View>
              </View>
            </View>
        </View>
        <View style={styles.charFile}>
          <Text style={styles.charInfos}>Name: {poke.species.name}</Text>

          <View style={styles.typesContainer}>
            <Text>Types: </Text>
            {poke.types.map((type, index) => (
              <Text key={index} style={[styles.typeName, { backgroundColor: colours[type.type.name] }]}>
                {type.type.name}
              </Text>
            ))}
          </View>
          <View style={styles.movesContainer}>
            <Text>Moves: </Text>
            {poke.moves.map((move, index) => (
              <Text key={index} style={[styles.moveName,]}>
                {move.move.name}
              </Text>
            ))}
          </View>

          <View style={styles.movesContainer}>
            <Text>locations: </Text>
            {location.loc.length > 0 ? (
              location.loc.map((loc, index) => (
                <Text key={index} style={[styles.moveName]}>
                  {loc.replace(/-/g, " ")}
                </Text>
              ))
            ) : (
              <Text style={[styles.moveName]}>localizacao desconhecida</Text>
            )}
          </View>


        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  charInfo: {
    justifyContent: 'center',
    padding: "12px",
    alignItems: "center",
    gap: "5px"
  },
  charFile:{
    width: '80%',
    height: 'auto',
    backgroundColor: "#FFF",
    borderRadius: "10px",
    borderWidth: "3px",
    borderColor: "#cecece",
    borderStyle: "solid",
    padding: "10px",
    gap: "15px"
  },
  charInfos: {
    textAlign: "center",
    fontWeight: 900,
  },
  typeName:{
    textAlign: "center",
    fontWeight: 900,
    padding: 10,
    borderRadius: '10px',
    textTransform: 'uppercase',
    color: "white"
  },  
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  movesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    overflowX: 'scroll',
    color: 'black'
  },
  moveName:{
    textAlign: "center",
    fontWeight: 900,
    padding: 10,
    borderRadius: '10px',
    textTransform: 'uppercase',
    backgroundColor: 'black',
    color: "white",
    whiteSpace: 'nowrap'
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
    position: 'relative',
    justifyContent: 'center'
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
  characterImage: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2
  },
  heartContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default DetailScreen
