import mockFetch from './mockFetch';
import beatlesData from '../fixtures/beatles';
import artistNotFound from '../fixtures/artistNotFound';

const mockResponse = {
  beatlesSearch: () => {
    mockFetch.resolve({
      'ok': true, 
      'status': 200, 
      json: function() {
        return beatlesData
      }
    });
  },
  emptySearch: () => {
    mockFetch.reject({
      status: 400,
      error: 'No search query'
    });
  }, 
  artistNotFound: () => {
    mockFetch.resolve({
      ok: true, 
      status: 200, 
      json: () => {
        return artistNotFound;
      }
    });
  }
};

export default mockResponse;