const request = require('request-promise');

const BASE_URL = 'http://swapi.co/api';

function run() {
    request(`${BASE_URL}/people/1`).then(response => {
        const skywalker = JSON.parse(response);
        const promises = skywalker.vehicles.map(link => request(link));
        Promise.all(promises).then(responses => {
            console.log(responses.map(res => JSON.parse(res).name));
        });
    });
}

run();
