// This file deals with the functions to get backend data

const axios = require("axios");


export default class {
  constructor() {
    console.log("Server Loaded");
  }

  // { value: 'maths', label: 'Maths' },
  // { value: 'english', label: 'English' },
  // { value: 'learnChinese', label: 'Learn Chinese' }
  getSubjects() {
    let returnValue = null;
    return axios.get('http://localhost:8000/main/subjects')
      .then(function (response) {
      // handle success
        returnValue = response;
    })
      .catch(function (error) {
        // handle error
        console.log(error);
    })
      .then(function () {
        // always executed
    });
    return returnValue;
  }



}



