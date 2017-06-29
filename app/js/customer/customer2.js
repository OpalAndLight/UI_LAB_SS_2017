var xmlhttp = new XMLHttpRequest();
var data;
var isValidFile= false;
var fs = require('fs');
var myid = 1;
var selectedCustomerAt = -1;
var params;
var maySave = false;

xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myArr = JSON.parse(this.responseText);
		document.getElementById("address").value = myArr.results[0].formatted_address;
		document.getElementById("latitude").value = myArr.results[0].geometry.location.lat;
		document.getElementById("longitude").value = myArr.results[0].geometry.location.lng;
	}
};

function onPageLoad() {
	FIXRETARDEDPATHSHIT();
	try {
		var jsonString = fs.readFileSync("app/js/customer/customer.json");
		data = JSON.parse(jsonString);
		isValidFile = true;
	}
	catch(err) {
		isValidFile = false;
	}
	var url = window.location.href;
	params = url.split('?');
	if(params[1] != "new") {
		updatePage();
	}	
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
	var id = params[1];
	if(isValidFile) {
		for (index = 0; index < data.customer.length; ++index) {
			if(data.customer[index].id == id) {
				selectedCustomerAt = index;
			}
		}
	}
	if (selectedCustomerAt == -1) {
		location.href = "customer.html"
	}
	myid = data.customer[selectedCustomerAt].id;
	document.getElementById("name").value = data.customer[selectedCustomerAt].name;
	document.getElementById("address").value = data.customer[selectedCustomerAt].address;
	document.getElementById("phone").value = data.customer[selectedCustomerAt].phone;
	document.getElementById("mobile").value = data.customer[selectedCustomerAt].mobile;
	document.getElementById("web").value = data.customer[selectedCustomerAt].web;
	document.getElementById("email").value = data.customer[selectedCustomerAt].email;
	document.getElementById("latitude").value = data.customer[selectedCustomerAt].location[0];
	document.getElementById("longitude").value = data.customer[selectedCustomerAt].location[1];
	document.getElementById("NCC").href = "customer3.html?" + id;
	document.getElementById("NCADD").classList.remove('disabled');
	document.getElementById("nameForm").classList.remove('has-error');
	document.getElementById("nameForm").classList.add('has-success');
	document.getElementById("nameStatusIcon").classList.remove('glyphicon-warning-sign');
	document.getElementById("nameStatusIcon").classList.add('glyphicon-ok');
	updateEmail();
	maySave = true;
}

document.getElementById('GetAdressFromGoogle').onclick = () => {
	xmlhttp.open("GET", "http://maps.google.com/maps/api/geocode/json?address=" + document.getElementById("address").value, true);
	xmlhttp.send();
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function updateEmail() {
	document.getElementById("emailForm").classList.remove('has-error');
	document.getElementById("emailForm").classList.remove('has-success');
	document.getElementById("emailStatusIcon").classList.remove('glyphicon-ok');
	document.getElementById("emailStatusIcon").classList.remove('glyphicon-warning-sign');
	if(document.getElementById("email").value == "") {
		
	} else if (validateEmail(document.getElementById("email").value)) {
		document.getElementById("emailForm").classList.add('has-success');
		document.getElementById("emailStatusIcon").classList.add('glyphicon-ok');
	} else {
		document.getElementById("emailForm").classList.add('has-error');
		document.getElementById("emailStatusIcon").classList.add('glyphicon-warning-sign');
	}
}

document.getElementById('email').onblur = () => {
	updateEmail();
}

document.getElementById('name').onblur = () => {
	document.getElementById("nameForm").classList.remove('has-error');
	document.getElementById("nameForm").classList.remove('has-success');
	document.getElementById("nameStatusIcon").classList.remove('glyphicon-ok');
	document.getElementById("nameStatusIcon").classList.remove('glyphicon-warning-sign');
	if(document.getElementById("name").value.length >= 2) {
		document.getElementById("nameForm").classList.add('has-success');
		document.getElementById("nameStatusIcon").classList.add('glyphicon-ok');
		document.getElementById("NCADD").classList.remove('disabled');
		maySave = true;
	} else {
		document.getElementById("nameForm").classList.add('has-error');
		document.getElementById("nameStatusIcon").classList.add('glyphicon-warning-sign');
		document.getElementById("NCADD").classList.add('disabled');
		maySave = false;
	}
}



document.getElementById('NCADD').onclick = () => {
	if(maySave) {
	if(isValidFile && params[1] == "new") {
		for (index = 0; index < data.customer.length; ++index) {
			if (myid <= data.customer[index].id) {
				myid = data.customer[index].id + 1;
			}
		}
		var myData = {
			customer: [
			{
				id: myid,
				name: document.getElementById("name").value,
				location: [document.getElementById("latitude").value, document.getElementById("longitude").value],
				address: document.getElementById("address").value,
				phone: document.getElementById("phone").value,
				mobile: document.getElementById("mobile").value,
				web: document.getElementById("web").value,
				email: document.getElementById("email").value
			}
		]		
		}
	
		var result;
		if(isValidFile) {
			data.customer.push(myData.customer[0]);
			result = data;
		} else {
			result = myData;
		}
	} else {
		data.customer[selectedCustomerAt].id = myid;
		data.customer[selectedCustomerAt].name = document.getElementById("name").value;
		data.customer[selectedCustomerAt].address = document.getElementById("address").value;
		data.customer[selectedCustomerAt].phone = document.getElementById("phone").value;
		data.customer[selectedCustomerAt].mobile = document.getElementById("mobile").value;
		data.customer[selectedCustomerAt].web = document.getElementById("web").value;
		data.customer[selectedCustomerAt].email = document.getElementById("email").value;
		data.customer[selectedCustomerAt].location[0] = document.getElementById("latitude").value;
		data.customer[selectedCustomerAt].location[1] = document.getElementById("longitude").value;
		result = data;
	}
		
	
	var jsonData = JSON.stringify(result);	
	
	fs.writeFile("app/js/customer/customer.json", jsonData, function(err) {
		if(err) {
			return console.log(err);
		}
	});
	if(params[1] == "new") {
		location.href = "customer.html"
	} else {
		location.href = "customer3.html?" + params[1];
	}
	}
}
onPageLoad();
