let data = require('./data-static.js');

function displayLots() {
    let lotSelect = document.getElementById('parts-select');
    let partList = "";
    data.parts.forEach((part) => {
        partList += `<option value="${part.id}">${part.name}</option>`;
    });
    partsSelect.innerHTML = partList;
}


data.lot.serviceCenter.forEach((center) => {
    $('#serviceCenter').append('<li id='+ center.id +'><a href="#">'
        + center.name +'</a></li>');

    $('#'+ center.id).click( center, function(){
        $('#centerName').text('Service Center: ' + center.name);
            console.log(center.name);

    var tabBody = $('#lotTableBody')
    tabBody.empty();
    center.lot.forEach((lot) => {
    if (lot.status == "SERVICE") {
      var tr = $('<tr class="info" />').appendTo(tabBody);
      tr.append('<th scope="row">' + lot.id + '</th>');
      tr.append('<td>' + lot.name + '</td>');
      tr.append('<td>' + lot.type + '</td>');
      tr.append('<td><a href="#">' + lot.ServiceOrderID + '</a></td>');
      tr.append('<td>' + lot.status + '</td>');
    }
    else {
      var tr = $('<tr class="success" />').appendTo(tabBody);
      tr.append('<th scope="row">' + lot.id + '</th>');
      tr.append('<td>' + lot.name + '</td>');
      tr.append('<td>' + lot.type + '</td>');
      tr.append('<td><a href="#">' + lot.ServiceOrderID + '</a></td>');
      tr.append('<td>' + lot.status + '</td>');
    }

//  if lot.status == "Service"
    });

    });


});
