
const BASE_URL = 'https://api.rawg.io/api/games';

export const fetchGames = async (page, pageSize, ordering) => {
  const response = await fetch(`${BASE_URL}?page=${page}&page_size=${pageSize}&ordering=${ordering}&key=YOUR_API_KEY`);
  const data = await response.json();
  return data;
};

export const fetchPlatforms = async () => {
  const response = await fetch(`${BASE_URL}/platforms?key=YOUR_API_KEY`);
  const data = await response.json();
  return data.results;
};

// Helper function for date formatting
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
