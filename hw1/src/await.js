const request = require('request-promise');

const BASE_URL = 'http://swapi.co/api';

async function run() {
    const skywalker = JSON.parse(await request(`${BASE_URL}/people/1`));
    const promises = skywalker.vehicles.map(link => request(link));
    const vehiclesData = await Promise.all(promises);

    console.log(vehiclesData.map(res => JSON.parse(res).name));
}

run();
