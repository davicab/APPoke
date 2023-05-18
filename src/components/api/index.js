import axios from 'axios'

const baseURL = 'https://pokeapi.co/api/v2/'

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

const getCharacter = async ({ name = '' }) => {
  const uri = encodeURI(`pokemon/${name}`)
  return await client.get(uri)
}
const getCharacterId = async ({ ids = '' }) => {
  const uri = encodeURI(`pokemon/${ids}?limit=300`)
  return await client.get(uri)
}
const getLocation = async ({ id = ''}) => {
  const uri = encodeURI(`pokemon/${id}/1/encounters?limit=300`)
  return await client.get(uri)
}



export { getCharacter, getLocation, getCharacterId }