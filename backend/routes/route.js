const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;  // Use server-side environment variable
const BASE_URL = 'https://api.rawg.io/api';  // RAWG API base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// Fetch Trending Games
router.get('/games', async (req, res) => {
  try {
    const defaultParams = {
      dates: '2023-10-01,2024-10-01',
      ordering: '-added',
      page_size: 20,
    };
    const params = { ...defaultParams, ...req.query };
    const response = await axiosInstance.get('/games', { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Fetch Game Details by ID
router.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/games/${id}`);
    res.json(response.data); 
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

// Fetch Genres
router.get('/genres', async (req, res) => {
  try {
    const response = await axiosInstance.get('/genres');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Fetch Platforms
router.get('/platforms', async (req, res) => {
  try {
    const response = await axiosInstance.get('/platforms/lists/parents');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).json({ error: 'Failed to fetch platforms' });
  }
});

// Fetch Stores
router.get('/stores', async (req, res) => {
  try {
    const response = await axiosInstance.get('/stores');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

// Fetch Tags
router.get('/tags', async (req, res) => {
  try {
    const response = await axiosInstance.get('/tags');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Fetch Developers
router.get('/developers', async (req, res) => {
  try {
    const response = await axiosInstance.get('/developers');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({ error: 'Failed to fetch developers' });
  }
});

// Fetch Publishers
router.get('/publishers', async (req, res) => {
  try {
    const response = await axiosInstance.get('/publishers');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching publishers:', error);
    res.status(500).json({ error: 'Failed to fetch publishers' });
  }
});

// Search Games
router.get('/search', async (req, res) => {
  try {
    const { query, page } = req.query;
    const response = await axiosInstance.get('/games', {
      params: {
        search: query,
        page: page || 1,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching games:', error);
    res.status(500).json({ error: 'Failed to search games' });
  }
});

// Fetch Game Screenshots by Game ID
router.get('/games/:id/screenshots', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/games/${id}/screenshots`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    res.status(500).json({ error: 'Failed to fetch game screenshots' });
  }
});

// Fetch Game Trailers by Game ID
router.get('/games/:id/movies', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/games/${id}/movies`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    res.status(500).json({ error: 'Failed to fetch game trailers' });
  }
});

module.exports = router;
