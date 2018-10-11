// @flow
const request = require('request');

const BASE_URL = 'http://swapi.co/api';

const vehicles = [];

function processOutput() {
    console.log(vehicles.map(vehicle => vehicle.name));
}

function run() {
    request(`${BASE_URL}/people/1`, function(error, response, dataSkywalker) {
        const vehicleLinks = JSON.parse(dataSkywalker).vehicles;
        vehicleLinks.map(link => {
            request(link, function(error, response, vehicleData) {
                vehicles.push(JSON.parse(vehicleData));
                if (vehicles.length === vehicleLinks.length) {
                    processOutput();
                }
            });
        });
    });
}

run();
