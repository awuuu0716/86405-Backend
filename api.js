const axios = require('axios');
const BASE_URL = 'https://api.imgur.com/3';
const CLIENT_ID = 'Bearer aafb608b822028caf4bdb31c7686a8b4892a0ff3';

const api = {
  uploadImg: (image) =>
    axios({
      method: 'POST',
      url: `${BASE_URL}/upload`,
      responseType: 'json',
      headers: {
        Authorization: CLIENT_ID,
      },
      data: {
        image,
        type: 'base64',
      },
    })
      .then((res) => res.data)
      .catch((err) => err),
};

module.exports = api;
