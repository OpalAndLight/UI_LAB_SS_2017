let elementsPerPage = 6;
var currentPage = 0;
var data;
var rawdata;
var isValidFile= false;

function onPageLoad() {
	var fs = require('fs');
	FIXRETARDEDPATHSHIT();
	try {
		var jsonString = fs.readFileSync("app/js/customer/customer.json");
		rawdata = JSON.parse(jsonString);
		data = rawdata;
		isValidFile = true;
	}
	catch(err) {
		isValidFile = false;
	}
	updatePage();	
}

function updatePage() {
	document.getElementById("content").innerHTML = "";
	if(isValidFile) {
		for (index = (currentPage * elementsPerPage); index < data.customer.length && index < ((currentPage + 1) * elementsPerPage); ++index) {
			var field = '<a href="customer3.html?' + data.customer[index].id + '" class="list-group-item">';
			field += '<h4 class="list-group-item-heading">' + data.customer[index].name + '</h4>';
			field += '<p class="list-group-item-text">' + data.customer[index].address + '</p>';
			field += '</a>';
			document.getElementById("content").innerHTML += field; 		
		}
		if (data.customer.length >= elementsPerPage) {
			document.getElementById("MyPager").classList.remove('hidden');
		}
		if(currentPage == 0) {
			document.getElementById("previousField").classList.add('hidden');	
		} else {
			document.getElementById("previousField").classList.remove('hidden');	
		}
		if(data.customer.length <= ((currentPage + 1) * elementsPerPage)) {
			document.getElementById("nextField").classList.add('hidden');
		} else {
			document.getElementById("nextField").classList.remove('hidden');
		}		
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

function search() {
	currentPage = 0;
	if(document.getElementById("SearchText").value == "") {
		data = rawdata;
		document.getElementById("ClearBtn").classList.add('hidden');
	} else {
		let searchtext = document.getElementById("SearchText").value;
		var sorted = {customer: []};
		for (index = 0; index < rawdata.customer.length; ++index) {
			if(rawdata.customer[index].name.toLowerCase().includes(searchtext.toLowerCase())) {
				sorted.customer.push(rawdata.customer[index]);
			} 		
		}
		data = sorted;
		document.getElementById("ClearBtn").classList.remove('hidden');		
	}	
	updatePage();
}

onPageLoad();
document.getElementById("nextField").onclick = () => {
	currentPage++;
	updatePage();
}

document.getElementById("previousField").onclick = () => {
	currentPage--;
	updatePage();
}

document.getElementById("SearchBtn").onclick = () => {
	search();
}

document.getElementById("ClearBtn").onclick = () => {
	document.getElementById("SearchText").value = "";
	search();
}

document.getElementById("SearchText").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        search();
    }
});
