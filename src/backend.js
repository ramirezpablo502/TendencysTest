const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkM2NIVUVibVJoc1EzeXhNbzV2VnliSTFzaDZCSDJZRCIsImlhdCI6MTU4NTkzMjYzNDU0OH0.tMSht_M3ryQl5IqCirhYR1gb8j3FQ26vILT4Qpx4XrdFz-zUmqbgFYiKTaZHPpB85etRIMhxVoZf6tOrHy0fnA";

module.exports = {
  TestInformation: function TestInformation(callback) {
    fetch('https://eshop-deve.herokuapp.com/api/v2/orders/2117155815564', {
      "method": "GET",
      "headers": {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson)
      })
      .catch((error) => {
        console.log(error);
      })
  },
};
