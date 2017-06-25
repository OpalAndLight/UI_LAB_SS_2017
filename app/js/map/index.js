const data = require('./data-static.js')
const customer_data = require('./../customer/customer.json')
const lot_data = require('./../lot/data-static.js')
const iconSettings = require('./iconSettings.js')

// include remote data
data.customer = [...customer_data.customer];
data.serviceCenter = [...lot_data.lot.serviceCenter];

// return icons for marker with adapted settings
function getIcon(category, type) {
    let currentSetting = iconSettings.get(category, type)

    return L.AwesomeMarkers.icon({
        icon: currentSetting.icon,
        prefix: 'fa',
        markerColor: currentSetting.color
    })
}

// sets all markers for certain category to current map
function setMarkers(category) {
    data[category].forEach((dataset) => {
        L.marker(dataset.location, {icon: getIcon(category, dataset.type) })
            .addTo(markers)
            .bindPopup(`<b>${dataset.name}</b><br>
                ${dataset.description ? 'description: ' + dataset.description + '<br>' : ''}
                ${dataset.serialNumber ? 'serialNumber: ' + dataset.serialNumber + '<br>' : ''}
                ${dataset.activationDate ? 'activationDate: ' + dataset.activationDate + '<br>' : ''}`);
    })
}

// update displayed markers
function updateMap(e) {
    let inputs = [...document.getElementsByTagName('input')] // get all inputs into array

    markers.clearLayers() // remove old markers

    // set markers for all active categories
    inputs.forEach((input) => {
        if (input.checked) {
            setMarkers(input.value)
        }
    })

    // update map bounds if there are any markers
    let markerBounds = markers.getBounds()
    if (markerBounds.isValid()) {
        mymap.fitBounds(markerBounds);
    } else {
        mymap.setView([49.009748, 8.403061], 13);
    }
}

// update markers when form changes
document.getElementById('mapForm').addEventListener("change", updateMap);

// init map
let mymap = L.map('mapid').setView([49.009748, 8.403061], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(mymap);

// group for adding and removing all markers
let markers = L.featureGroup()
.addTo(mymap);
