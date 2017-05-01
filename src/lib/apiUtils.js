const apiUtils = {
  checkStatus: (response) => {
    if(response.status >= 200 && response.status < 300) {
      return response;
    } else {
      console.log(error);
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}

export default apiUtils;