import axios from 'axios'

const baseURL = 'https://pokeapi.co/api/v2/'

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

const getCharacter = async ({ name = '' }) => {
  if (name == '' || name == null) {
    const results = [];
    const generatedNumbers = new Set();
    
    while (results.length < 50) {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      
      if (!generatedNumbers.has(randomId)) {
        generatedNumbers.add(randomId);
        
        const uri = encodeURI(`pokemon/${randomId}`);
        const response = await client.get(uri);
        results.push(response);
      }
    }
    
    return results;
  } else {
    const uri = encodeURI(`pokemon/${name}`);
    return await client.get(uri);
  }
};

const getSinglePoke = async (name) => {
  const uri = encodeURI(`pokemon/${name}`)
  return await client.get(uri)
}
const getLocation = async (id) => {
  const uri = encodeURI(`pokemon/${id}/encounters`)
  return await client.get(uri)
}



export { getCharacter, getLocation, getSinglePoke }