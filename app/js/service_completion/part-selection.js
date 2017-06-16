const data = require('./data-parts-static.js');

function displayParts() {
    console.log('init partslist');
    let partsSelect = document.getElementById('parts-select');
    let partList = "";
    data.parts.forEach((part) => {
        console.log(part);
        partList += `<option value="${part.id}">${part.name}</option>`;
    });
    console.log(partList);
    partsSelect.innerHTML = partList;
}



displayParts();