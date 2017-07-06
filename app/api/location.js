import React from 'react';

import { Constants, Location, Permissions } from 'expo';

export function locationByIp(callback) {
  fetch('https://freegeoip.net/json/').then((response) => response.json()).then(callback).catch((error) => {
    callback(null, error);
  });
};


export function nearby(lat, long, callback) {
  fetch("http://gd2.geobytes.com/GetNearbyCities?radius=100&Latitude=" + lat + "&Longitude=" + long)
  .then((response) => response.json())
  .then(callback).catch((error) => {
    callback(null, error);
  });
};

