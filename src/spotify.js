const BASE_URL = 'https://api.spotify.com/v1';

const Spotify = {
  getSearchUrl: (query) => {
    return `${BASE_URL}/search?q=${encodeURI(query)}&type=artist&limit=1`;
  },

  getTracksUrl: (artistId) => {
    return `${BASE_URL}/artists/${artistId}/top-tracks?country=US&`;
  },

  search: (query) => {
    let searchUrl = Spotify.getSearchUrl(query);
    return fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  },

  getTracks: (artistId) => {
    let searchUrl = Spotify.getTracksUrl(artistId);
    return fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }
}

export default Spotify;