const Project = require('../models/project');
const axios = require('axios');


const ZOHO_CONFIG = {
  REFRESH_TOKEN: '1000.94b7dc3321e5d1058d7cbb61d31df95f.88e317338a595c51c3704ab1dfc7b747',
  CLIENT_ID: '1000.M1ZR5LBRFDEL4K6BRLEDO91LON7YAB',
  CLIENT_SECRET: '3e45419e60f708786623ae53ee953f4d7c2302b0b5',
  GRANT_TYPE: 'refresh_token',
};

const ZOHO_API_URL = 'https://creator.zoho.com/api/v2/premaconsultinggroupllc/pemo/report/Flutter_Live_Projects';
const ZOHO_AUTH_URL = 'https://accounts.zoho.com/oauth/v2/token';

let accessToken;

// Function to refresh the Zoho access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(ZOHO_AUTH_URL, null, {
      params: {
        refresh_token: ZOHO_CONFIG.REFRESH_TOKEN,
        client_id: ZOHO_CONFIG.CLIENT_ID,
        client_secret: ZOHO_CONFIG.CLIENT_SECRET,
        grant_type: ZOHO_CONFIG.GRANT_TYPE,
      },
    });
    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Failed to refresh Zoho access token:', error.message);
  }
};

// Function to fetch project details from Zoho Creator
const fetchProjectDetails = async (req, res) => {
  if (!accessToken) {
    await refreshAccessToken();
  }

  try {
    const response = await axios.get(ZOHO_API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const projects =  response.data.data;

    return res.status(201).json({projects})
  } catch (error) {
    console.error('Failed to fetch project details:', error.message);
    return null;
  }
};

module.exports = {
  fetchProjectDetails,
};

