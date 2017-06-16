const data = require('./data-parts-static.js');

function displayParts() {
    let partsSelect = document.getElementById('parts-select');
    let partList = "";
    data.parts.forEach((part) => {
        console.log(part);
        partList += `<option>${part.name}</option>`;
    });
    console.log(partList);
    partsSelect.innerHTML = partList;
}

displayParts();