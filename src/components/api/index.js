import axios from 'axios'

const baseURL = 'https://pokeapi.co/api/v2/'

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

const getCharacter = async ({ name = '' }) => {
  if (name == '' || name == null) {
    const results = [];
    for (let i = 0; i < 50; i++) {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      const uri = encodeURI(`pokemon/${randomId}`);
      const response = await client.get(uri);
      results.push(response);
    }
    return results;
  } else {
    const uri = encodeURI(`pokemon/${name}`);
    return await client.get(uri)
  }
};
const getCharacterId = async ({ ids = '' }) => {
  const uri = encodeURI(`pokemon/${ids}?limit=50`)
  return await client.get(uri)
}
const getLocation = async ({ id = ''}) => {
  const uri = encodeURI(`pokemon/${id}/1/encounters?limit=50`)
  return await client.get(uri)
}



export { getCharacter, getLocation, getCharacterId }