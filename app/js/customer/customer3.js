var data;
var isValidFile= false;
const {shell} = require('electron')
var serviceRequestData;
var isVallidServiceRequestData = false;
var fs = require('fs');
var selectedCustomerAt = -1;

function onPageLoad() {	
	try {
		var jsonString = fs.readFileSync("app/js/customer/customer.json");
		data = JSON.parse(jsonString);
		isValidFile = true;
	}
	catch(err) {
		isValidFile = false;
	}
	try {
		var jsonString = fs.readFileSync("app/js/customer/servicerequest_static.json");
		serviceRequestData = JSON.parse(jsonString);
		isVallidServiceRequestData = true;
	}
	catch(err) {
		isVallidServiceRequestData = false;
	}
	updatePage();	
}

function updatePage() {
	var url = window.location.href;
	var params = url.split('?');
	if(params.length <= 1) {
		location.href = "customer.html";
	}
	
	var id = params[1];
	document.getElementById("edit").href = "customer2.html?" + id;
	selectedCustomerAt = -1;
	if(isValidFile) {
		for (index = 0; index < data.customer.length; ++index) {
			if(data.customer[index].id == id) {
				selectedCustomerAt = index;
			}
		}
	}
	if(selectedCustomerAt == -1) {
		location.href = "customer.html";
	}
	
	document.getElementById("cName").innerHTML = data.customer[selectedCustomerAt].name;
	document.getElementById("cAddress").innerHTML = data.customer[selectedCustomerAt].address;
	document.getElementById("cPhone").innerHTML = data.customer[selectedCustomerAt].phone;
	document.getElementById("cMobile").innerHTML = data.customer[selectedCustomerAt].mobile;
	document.getElementById("cWeb").innerHTML = data.customer[selectedCustomerAt].web;
	document.getElementById("cEmail").innerHTML = data.customer[selectedCustomerAt].email;
	document.getElementById("cLat").innerHTML = data.customer[selectedCustomerAt].location[0];
	document.getElementById("cLng").innerHTML = data.customer[selectedCustomerAt].location[1];
	
	var serviceRequests = 0;
	if(isVallidServiceRequestData && isValidFile) {
		for (index = 0; index < serviceRequestData.ServiceRequest.length; ++index) {
			if(serviceRequestData.ServiceRequest[index].customer == data.customer[selectedCustomerAt].id) {
				var field;
				if(serviceRequestData.ServiceRequest[index].urgency == "LOW") {
					field = '<li class="list-group-item list-group-item-info">'; 
				} else if(serviceRequestData.ServiceRequest[index].urgency == "HIGH") {
					field = '<li class="list-group-item list-group-item-warning">'; 
				} else if (serviceRequestData.ServiceRequest[index].urgency == "CRITICAL") {
					field = '<li class="list-group-item list-group-item-danger">';					
				} else {
					field = '<li class="list-group-item">'; 
				}
				field += '<h4 class="list-group-item-heading">Type: ' + serviceRequestData.ServiceRequest[index].serviceType + '<br>Urgency: ' + serviceRequestData.ServiceRequest[index].urgency + '</h4>';
				field += '<p class="list-group-item-text">Description: ' + serviceRequestData.ServiceRequest[index].issueDetails + '</p>';
				field += '<p class="list-group-item-text">Servicetype: ' + serviceRequestData.ServiceRequest[index].type + '</p>';
				field += '<p class="list-group-item-text">Date: ' + serviceRequestData.ServiceRequest[index].timestamp + '</p>';
				field += '</li>';
				document.getElementById("RQcontent").innerHTML += field; 
				serviceRequests++;
			}
		}
	}
	if (serviceRequests > 0) {
		document.getElementById("delete").classList.add('disabled');
		document.getElementById("finalDelete").classList.add('hidden');
		document.getElementById("diagTitle").innerHTML = "You can't delete customers while they still have open requests!";		
	}	
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

document.getElementById("finalDelete").onclick = () => {	
	if (selectedCustomerAt > -1) {
		data.customer.splice(selectedCustomerAt, 1);
	} else {
		location.href = "customer.html"
	}
	
	var jsonData = JSON.stringify(data);	
	
	fs.writeFile("app/js/customer/customer.json", jsonData, function(err) {
		if(err) {
			return console.log(err);
		}
	});	
	location.href = "customer.html"
}

document.getElementById("WebpageLine").onclick = () => {	
	shell.openExternal(document.getElementById("cWeb").innerHTML);
}

document.getElementById("mailtoLine").onclick = () => {	
	shell.openExternal('mailto:' + document.getElementById("cEmail").innerHTML);
}

onPageLoad();