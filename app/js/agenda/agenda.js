let data = require('./data-static.js');


function getCustomer(serviceRequestId) {
    for (var i = 0; i < data.ServiceRequest.length; i++) {
        let tempRequest = data.ServiceRequest[i];
        if (tempRequest.id == serviceRequestId) {
            let customerId = tempRequest.customer;

            for (var j = 0; j < data.customer.length; j++) {
                let tempCustomer = data.customer[j];
                if (tempCustomer.id == customerId) {
                    return tempCustomer;
                }
            }
        }
    }
}


function setData(data) {

    let agentaTableId = document.getElementById('agenda-table');
    let tableBody = agentaTableId.tBodies[0];
    let agendaItem = tableBody.getElementsByClassName("agenda-item")[0];
    agendaItem.parentNode.removeChild(agendaItem);


    for (var i = 0; i < data.serviceOrder.length; i++) {
        let tempItem = agendaItem.cloneNode(true);
        let tempOrder = data.serviceOrder[i];
        tempItem.getElementsByClassName("planned-time")[0].firstElementChild.innerHTML = tempOrder.plannedTime;

        let requestId = tempOrder.serviceRequest;
        let tempCustomer = getCustomer(requestId);

        let customerEntry = tempItem.getElementsByClassName("customer")[0];

        if (tempCustomer != null) {

            customerEntry.href = "customer/customer3.html?" + tempCustomer.id;
            customerEntry.firstElementChild.innerHTML = tempCustomer.name;
            customerEntry.lastElementChild.innerHTML = tempCustomer.address;
        } else {
            customerEntry.firstElementChild.innerHTML = "Customer not found";
        }

        tempItem.getElementsByClassName("btn")[0].href = "service_order.html?id=" + tempOrder.id;

        tableBody.appendChild(tempItem);
    }
}


setData(data);