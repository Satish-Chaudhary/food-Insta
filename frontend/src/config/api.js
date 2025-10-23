import axios from 'axios';

// Set the base URL for API requests
const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Assuming backend runs on port 3000
  withCredentials: true, // Send cookies with requests
});

export default api;