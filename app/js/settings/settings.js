var Datastore = require('nedb');
db = new Datastore({ filename: 'app/js/settings/user.db', autoload: true });

const settings = require('electron-settings');

//var user = [{id: 1, email: "mm@hska.de", password: "mm", technician:1}, {id: 2, email: "hm@hska.de", password: "hm", technician:2}]

//db.insert(user[0], function(err, newDoc) {
//    console.log(newDoc);
//});

window.onload = function() {
    console.log("Settings onLoad");

    let user = settings.get('user');
    console.log(user);

    if(user){
        document.getElementById('textfieldEmail').value = user.email;
        document.getElementById('textfieldPassword').value = user.password;
    }

    let mode = settings.get('mode');
    console.log(mode);

    if(mode){
        document.getElementById('dropdownMode').value = mode;
    }

  document.getElementById('buttonSubmit').addEventListener('click', () => {
    let email = document.getElementById('textfieldEmail').value;
    let password = document.getElementById('textfieldPassword').value;

    if(email === ""){
        alert("Email not specified.");
        return;
    }

    if(password === ""){
        alert("Password not specified.");
        return;
    }

    db.find({email: email, password: password}).sort({ done: 1 }).exec(function(err, docs) {
        console.log(docs);
        if(docs.length === 1){
            settings.set('user', docs[0]);

            //sample for getting the settings...
            console.log(settings.get('user'));

            //alert("Success!");
        }else{
            alert("User not found!");
        }
    });
  });


  document.getElementById('dropdownMode').addEventListener('change', () => {
    var mode = document.getElementById('dropdownMode').value;
    console.log(mode);
    settings.set('mode', mode);

    console.log(settings.get('mode'));
  });
}