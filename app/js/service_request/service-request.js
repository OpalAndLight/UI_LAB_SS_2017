let data = require('./data-static');

function fillField(field_id, field_value){
    let elem = document.getElementById(field_id);
    elem.innerText = field_value;
}

function selectField(field_id, selected_value){
    document.getElementById(field_id).value=selected_value;
}

function showServiceRequest(the_data){
    let sp = the_data.serviceProduct;
    fillField("service_product_name", sp.name);
    fillField("service_product_description", sp.description);
    fillField("service_product_type", sp.type.toLowerCase());

    let cu = the_data.customer;
    fillField("customer_name", cu.name);
    fillField("customer_phone", cu.phone);
    fillField("customer_email", cu.email);

    let iss = the_data.issueDetails;
    fillField("issue_error_code", iss.errorCode);
    fillField("issue_description", iss.description);
    fillField("issue_timestamp", iss.timestamp);
    fillField("issue_reason", iss.reason);

    selectField("properties_service_type", the_data.serviceType);
    selectField("properties_urgency", the_data.urgency);
    selectField("properties_type", the_data.type);

    document.getElementById("customerDetails").href = "customer/customer3.html?" + cu.id;
}

function prepareForm(techs, sr){

    let techField = document.getElementById("selected_technician");
    techs.forEach(function(t) {
        var opt = document.createElement("option");
        opt.value = t.id;
        opt.innerText = t.name;
        techField.appendChild(opt);
    }, this);

    let timeField = document.getElementById("planned_time");
    timeField.value = "1:30:00";

    let form = document.getElementById("service_request_form");
    form.addEventListener("submit", (ev) => {  
        ev.preventDefault();
        ev.stopPropagation();
        let so_id = Math.floor(Math.random() * 1000); // Maybe this can be improved ;-)
        let so = {
            	id: so_id,
                serviceRequest: sr,
                timestamp: Date.now(),
                technician: null,
                plannedParts: plannedParts,
                plannedTime: timeField.value,
                status:"OPEN"
        };
        let tech_id = techField.value;
        techs.forEach(function(element) {
            if (element.id === tech_id){
                so.technician = element;
            }
        }, this);

        sendServiceOrder(so);
    });
}

function sendServiceOrder(so){
    // Do fancy things to service order and send to the central intelligence.
    alert("Your service was ordered!");
    window.history.back();
}

let plannedParts = [ "Schrauben", "Eimer", "Nägel"];

showServiceRequest(data.serviceRequest);
prepareForm(data.technicians, data.serviceRequest);
renderPlannedParts();

document.addEventListener("DOMContentLoaded", () => {
    let butt = document.getElementById("addPlannedPartsButton");
    butt.addEventListener("click", () => {
        let field = document.getElementById("addPlannedParts");
        if (field.value.trim() !== ""){
            plannedParts.push(field.value);
            renderPlannedParts();
            field.value = "";
        }
    })
});


function renderPlannedParts(){
    let elem = document.getElementById("planned_parts_list");
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
    plannedParts.forEach(function(element) {
        let li = document.createElement("li");
        let link = document.createElement("a");
        link.classList.add("delete_symbol");
        link.innerText = "×";
        link.addEventListener("click", function(){
            let index = plannedParts.indexOf(element);
            plannedParts.splice(index, 1);
            renderPlannedParts();
        });
        let span = document.createElement("span");
        span.innerText = element;
        li.appendChild(span);
        li.appendChild(link);
        elem.appendChild(li);
    }, this);

}