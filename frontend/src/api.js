import axios from 'axios';


const API_KEY = '';
const BASE_URL = '/api/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});
  // Assuming axiosInstance is correctly set up

export const getGames = async (params = {}) => {
  try {
    // Define default parameters for new and trending games
    const defaultParams = {
      dates: '2023-10-01,2024-10-01',  // Games released within this year
      ordering: '-added',              // Trending games (ordered by most recently added)
      page_size: 20,                   // Number of games per request (you can change this as needed)
    };

    // Merge default parameters with any custom params passed to the function
    const finalParams = { ...defaultParams, ...params };

    // Make the API request with the final parameters
    const response = await axiosInstance.get('/games', { params: finalParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};


export const getGameDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await axiosInstance.get('/genres');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getPlatforms = async () => {
  try {
    const response = await axiosInstance.get('/platforms/lists/parents');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
};

export const getStores = async () => {
  try {
    const response = await axiosInstance.get('/stores');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await axiosInstance.get('/tags');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const getDevelopers = async () => {
  try {
    const response = await axiosInstance.get('/developers');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching developers:', error);
    throw error;
  }
};

export const getPublishers = async () => {
  try {
    const response = await axiosInstance.get('/publishers');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching publishers:', error);
    throw error;
  }
};

export const searchGames = async (query, page = 1) => {
  try {
    const response = await axiosInstance.get('/games', {
      params: {
        search: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

export const getGameScreenshots = async (id) => {
  try {
    const response = await axiosInstance.get(`/games/${id}/screenshots`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    throw error;
  }
};

export const getGameTrailers = async (id) => {
  try {
    const response = await axiosInstance.get(`/games/${id}/movies`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    throw error;
  }
};