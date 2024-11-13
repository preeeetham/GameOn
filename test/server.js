// getting data from rawg api hosted over http://localhost:8000/api

const axios = require('axios');

async function getGames() {
  const response = await axios.get('http://localhost:8000/api/games/1');
   console.log({_html: response.data.description});
}

getGames();