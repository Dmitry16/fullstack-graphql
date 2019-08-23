const express = require('express');
const axios = require('axios');
const router = express.Router();
const httpClient = require('../api');
const NodeCache = require( 'node-cache' );
const cache = new NodeCache({});
/* 
* GET request from the frontend client, fetch data from the external API
* and send collected data from 2 api calls to the client.
*
* ES6 features destructuring and async-await API are used
* in order to consequently get and merge data from the external API.
* When I have all the needed data collected I send it to the client.
*/
router.get('/', async function(req, res, next) {
  // extract the search keyword from the request object
  const searchKeyword = req.query.keyword;
  // get the data by the keyword from the cache
  const cachedData = cache.get(searchKeyword);
  // if there is cached data we send it to the client
  if (cachedData) {
    console.log('cachedDataStats:', cache.getStats());
    res.status(200).send(JSON.parse(cachedData));
    return;
    // if there is no cached data make api calls, check the data,
    // set it to the cache and send it to the frontend client
  } else {
    const data = await fetchMovies(searchKeyword);
    data && sendData(res, searchKeyword, data) || res.status(400);
  }
});

function fetchMovies(searchKeyword) {
  let page = 0,
  call1Data = [],
  call2Data = [];
// parallel data fetching with Promise.all() returning data after the 2 calls finish
  try {
    call1Data = httpClient.fetchOmdbApi.getMovies(axios, searchKeyword, ++page);
    call2Data = httpClient.fetchOmdbApi.getMovies(axios, searchKeyword, ++page);
  }
  catch(err) { 
    console.log(err.errno)
    return err;
  }
  return Promise.all([call1Data, call2Data]);
}

// check fetched data, set it to the cache and send it to the client
function sendData(res, searchKeyword, data) {
  let recievedData = {};
  const [call1Data, call2Data] = data;
  // check if the responses have error
  // if not merge them into the data object
  if (call1Data && !call1Data.hasOwnProperty('Error')) {
    recievedData = {'Search': [...call1Data.Search]};

    if (call2Data && !call2Data.hasOwnProperty('Error')) {
      recievedData = {'Search': [...call1Data.Search, ...call2Data.Search]};
    }
    // log cache stats and set the data to the cache
    console.log('cachedDataStats:', cache.getStats());
    cache.set(searchKeyword, JSON.stringify(recievedData));

    recievedData && console.log('recievedData::', recievedData);

    res.status(200).send(recievedData);
  }
  else if (call1Data || call2Data) {
    res.status(200).send({});
  } else {
    res.status(501).send({});
  }
}

module.exports = router;

