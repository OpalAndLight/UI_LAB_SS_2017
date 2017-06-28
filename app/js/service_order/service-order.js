let data = require('../agenda/data-static.js');
let parts = require('../service_completion/data-parts-static.js');

const { URL, URLSearchParams } = require('url');

function getServiceOrder(serviceOrderId) {
    for (var i = 0; i < data.serviceOrder.length; i++) {
        let tempOrder = data.serviceOrder[i];
        if (tempOrder.id == serviceOrderId) {
            return tempOrder;
        }
    }
}


function getPart(serviceOrder, partId) {
    for (var i = 0; i < parts.parts.length; i++) {
        let tempPart = parts.parts[i];
        if (tempPart.id == partId) {
            return tempPart;
        }
    }
}

function getSerivceRequest(id) {
    for (var i = 0; i < data.ServiceRequest.length; i++) {
        let tempRequest = data.ServiceRequest[i];
        if (tempRequest.id == id) {
            return tempRequest;
        }
    }
}

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
    const url = new URL(window.location.href);
    let serviceOrderId = url.searchParams.get('id')
    let serviceOrder = getServiceOrder(serviceOrderId);
    let tempCustomer = getCustomer(serviceOrder.serviceRequest);

    let customerEntry =  document.getElementById('customer');
    customerEntry.firstElementChild.innerHTML = tempCustomer.name;
    customerEntry.lastElementChild.innerHTML = tempCustomer.address;
    customerEntry.href = "customer/customer3.html?" + tempCustomer.id;

    let tempRequest = getSerivceRequest(serviceOrder.serviceRequest);
    let requestEntry =  document.getElementById('service-request');
    requestEntry.firstElementChild.innerHTML = tempRequest.serviceType;
    requestEntry.lastElementChild.innerHTML = tempRequest.issueDetails;
    requestEntry.href = "service_request.html?id=" +serviceOrder.serviceRequest;

    document.getElementById('service-order-id').innerHTML = serviceOrderId;
    document.getElementById('service-timestamp').innerHTML = serviceOrder.timestamp;
    document.getElementById('service-technician').innerHTML = serviceOrder.technician;

    let partsList = document.getElementById('planned-parts');
    let plannedPartsItem = partsList.getElementsByClassName("list-group-item")[0];
    partsList.removeChild(plannedPartsItem);

    for (var i = 0; i < serviceOrder.plannedParts.length; i++) {
        let tempPartId = serviceOrder.plannedParts[i];
        let tempPart = getPart(serviceOrder, tempPartId);

        let tempItem = plannedPartsItem.cloneNode(true);

        if (tempPart != null) {
            tempItem.innerHTML = tempPart.name;
        } else
        {
            tempItem.innerHTML = "Unkown Part";
        }
        partsList.appendChild(tempItem);
    }

    document.getElementById('service-planned-time').innerHTML = serviceOrder.plannedTime;
    document.getElementById('service-status').innerHTML = serviceOrder.status;


    // let agentaTableId = document.getElementById('agenda-table');
    // let tableBody = agentaTableId.tBodies[0];
    // let agendaItem = tableBody.getElementsByClassName("agenda-item")[0];
    // agendaItem.parentNode.removeChild(agendaItem);
    //
    //
    // for (var i = 0; i < data.serviceOrder.length; i++) {
    //     let tempItem = agendaItem.cloneNode(true);
    //     let tempOrder = data.serviceOrder[i];
    //     tempItem.getElementsByClassName("planned-time")[0].firstElementChild.innerHTML = tempOrder.plannedTime;
    //
    //     let requestId = tempOrder.serviceRequest;
    //     let tempCustomer = getCustomer(data, requestId);
    //
    //     let customerEntry = tempItem.getElementsByClassName("customer")[0];
    //
    //     if (tempCustomer != null) {
    //
    //         customerEntry.href = "customer/customer3.html?" + tempCustomer.id;
    //         customerEntry.firstElementChild.innerHTML = tempCustomer.name;
    //         customerEntry.lastElementChild.innerHTML = tempCustomer.address;
    //     } else {
    //         customerEntry.firstElementChild.innerHTML = "Customer not found";
    //     }
    //
    //     tempItem.getElementsByClassName("btn")[0].href = "service_order.html?id=" + tempOrder.id;
    //
    //     tableBody.appendChild(tempItem);
    // }
}


setData(data);