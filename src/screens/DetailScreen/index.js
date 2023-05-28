import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, CheckBox, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import { getCharacter, getLocation } from '../../components/api'
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DetailScreen = ({navigation,route }) => {
  const { poke } = route.params
  const pokeId = poke.id
  const { theme, setTheme } = useContext(ThemeContext);
  const [isFilled, setIsFilled] = useState(true);
  
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
    checkIfPokeIdExists();
  }, [])

  const handleHeartPress = async () => {
    if (isFilled) {
      storeCurrentId(pokeId);
    } else {
      removeCurrentId(pokeId);
    }

    setIsFilled(!isFilled);
  };

  const checkIfPokeIdExists = async () => {
    try {
      const currentIds = await getCurrentIds();
      const pokeIdExists = currentIds.includes(pokeId);
      setIsFilled(!pokeIdExists);
    } catch (error) {
      console.log(error);
    }
  };
  const storeCurrentId = async (id) => {
    try {
      const currentIds = await getCurrentIds();
      
      if(!currentIds.includes(id)){

        let updatedIds = [...currentIds, id];
  
        await AsyncStorage.setItem('currentIds', JSON.stringify(updatedIds));

      }else{
        console.log('ja adicionado')
      }

    } catch (error) {
      console.log(error);
    }
  };
  
  const removeCurrentId = async (id) => {
    try {
      const currentIds = await getCurrentIds();
  
      let updatedIds = currentIds.filter((itemId) => itemId !== id);
  
      await AsyncStorage.setItem('currentIds', JSON.stringify(updatedIds));
    } catch (error) {
      console.log(error);
    }
  };
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

  return (
    <View style={tema.bg}>
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
        <View style={{flexDirection: 'row',gap: '10px'}}>
            <Text style={tema.title}>Favoritar</Text>
            <TouchableOpacity onPress={handleHeartPress}>
                <Image style={{width: "32px", height: "32px", position: 'relative'}} source={
                  isFilled
                    ? require('/assets/images/Heart.png')
                    : require('/assets/images/Heart-fill.png')
                } />

            </TouchableOpacity>
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
    width: '100%',
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
  searchBox: {
    width: "50px", height: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#cecece',
    padding: '5px',
    borderRadius: 8
  }
})


export default DetailScreen
