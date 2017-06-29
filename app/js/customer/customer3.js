var data;
var isValidFile= false;
const {shell} = require('electron')
var fs = require('fs');
var selectedCustomerAt = -1;
let SRQdata = require('./../service_request/data-static');

function onPageLoad() {	
	try {
		var jsonString = fs.readFileSync("app/js/customer/customer.json");
		data = JSON.parse(jsonString);
		isValidFile = true;
	}
	catch(err) {
		isValidFile = false;
	}
	updatePage();	
}

function FIXRETARDEDPATHSHIT() {
	var templatesImport = document.getElementById('nav_bar');
	var templates = templatesImport.import;
	var template = templates.getElementById('navigationTemplate');
	var clone = document.importNode(template.content, true);
	var list = clone.querySelectorAll('.navbar-nav li a');
	
	for (index = 0; index < list.length; ++index) {
		var pieces = list[index].href.split("/");
		if(pieces[pieces.length - 1] != "customer.html") {
			list[index].href = "./../" + pieces[pieces.length - 1];
		} else {
			list[index].href = "customer.html";
		}
	}
	document.getElementById('anav_bar').appendChild(clone);
}


function updatePage() {
	var url = window.location.href;
	var params = url.split('?');
	if(params.length <= 1) {
		location.href = "customer.html";
	}
	FIXRETARDEDPATHSHIT();
	
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
	if(isValidFile) {
		for (index = 0; index < SRQdata.serviceRequests.length; ++index) {
			if(SRQdata.serviceRequests[index].customer.id == data.customer[selectedCustomerAt].id) {
				var field;
				if(SRQdata.serviceRequests[index].urgency == "LOW") {
					field = '<a href="./../service_request.html?id=' + SRQdata.serviceRequests[index].id +'" class="list-group-item list-group-item-info">'; 
				} else if(SRQdata.serviceRequests[index].urgency == "HIGH") {
					field = '<a href="./../service_request.html?id=' + SRQdata.serviceRequests[index].id +'" class="list-group-item list-group-item-warning">'; 
				} else if (SRQdata.serviceRequests[index].urgency == "CRITICAL") {
					field = '<a href="./../service_request.html?id=' + SRQdata.serviceRequests[index].id +'" class="list-group-item list-group-item-danger">';					
				} else {
					field = '<a href="./../service_request.html?id=' + SRQdata.serviceRequests[index].id +'" class="list-group-item">'; 
				}
				field += '<h4 class="list-group-item-heading">Type: ' + SRQdata.serviceRequests[index].serviceType + '<br>Urgency: ' + SRQdata.serviceRequests[index].urgency + '</h4>';
				field += '<p class="list-group-item-text">Description: ' + SRQdata.serviceRequests[index].issueDetails.description + '</p>';
				field += '<p class="list-group-item-text">Servicetype: ' + SRQdata.serviceRequests[index].type + '</p>';
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

document.getElementById("back").onclick = () => {
	window.history.back();
}

onPageLoad();