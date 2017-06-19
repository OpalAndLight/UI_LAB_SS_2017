const data = require('./data-parts-static.js');

function displayParts() {
    let partsSelect = document.getElementById('parts-select');
    let partList = "";
    data.parts.forEach((part) => {
        partList += `<option value="${part.id}">${part.name}</option>`;
    });
    partsSelect.innerHTML = partList;
}

displayParts();