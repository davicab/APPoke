import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, CheckBox, Image } from 'react-native'
import { getCharacter } from '../../components/api'
import { useContext } from "react";
import { ThemeContext } from '../../components/ThemeContext';

const DetailScreen = ({navigation,route }) => {
  const { poke } = route.params
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

  function fetchLocationDetails(name) {
    navigation.navigate('LocationDetail',{name})
  }

  return (
    <View style={tema.bg}>
      <View style={{flexDirection: 'row', gap: "15px"  }}>
        <CheckBox value={theme} onValueChange={toggleTheme} />
        <Text style={{color: theme ? 'white' : 'black'}}>Modo Noturno</Text>
      </View>
      {/* <Text style={tema.title}>Bem vindo, {user}</Text> */}
      <View style={tema.charInfo}>
        <View style={styles.charBox}>
          <Image style={styles.charImg} source={poke.sprites.front_default} />
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

          <Text style={styles.charLocs}>Location: </Text>

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
  charImg: {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
    borderWidth: "1px",
    borderColor: "#cecece",
    borderStyle: "solid"
  },
  charBox: {
    position: 'relative',
  },
  charStatus:{
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "5px",
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
  openEp: {
    width: "80%",
    height: '60px',
    backgroundColor: "#fcfe8c",
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    color: "#985a2c",
    fontWeight: 900,
    fontSize: "20px",
    borderRadius: "10px",
    marginTop: "15px",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: "1px",
    borderColor: "#cecece",
    borderStyle: "solid"

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
  charLocs: {
    textAlign: "center",
    fontWeight: 700,
    backgroundColor: "#a0d4e7",
    borderRadius: "10px",
    marginTop: "15px",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "100%",
    height: '60px',
    padding: "10px",
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: "1px",
    borderColor: "#cecece",
    borderStyle: "solid"
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
})


export default DetailScreen
