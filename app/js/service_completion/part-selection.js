const data = require('./data-parts-static.js');

function displayParts() {
    let partsDiv = document.getElementById('service-used-parts');
    let partList = "";
    data.parts.forEach((part) => {
        console.log(part);
        partList += `<li>Id:${part.id}</li>`;
    });
    console.log('partList: ', partList);
    partsDiv.innerHTML = `<ul class="list-group">${partList}</ul>`;
}

displayParts();