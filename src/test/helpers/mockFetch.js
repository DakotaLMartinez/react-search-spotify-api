const originalFetch = global.fetch;

const mockFetch = {
  reject: (data) => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(data);
      });
    });
  },
  resolve: (data) => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    });
  }, 
  restore: () => {
    global.fetch = originalFetch;
  }
}

export default mockFetch;