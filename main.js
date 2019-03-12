var config = {
    apiKey: "AIzaSyAmCCpPS5i8Mkr9EgkUKSypC8FWxAzRpOg",
    authDomain: "npk-values.firebaseapp.com",
    databaseURL: "https://npk-values.firebaseio.com",
    projectId: "npk-values",
    storageBucket: "npk-values.appspot.com",
    messagingSenderId: "626946919063"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

  //var messagesRef = firebase.database().ref('messages');


  document.getElementById('contactForm').addEventListener('submit', submitData);

  function submitData(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var id= getInputVal('id');
    var city = getInputVal('city');
    var email = getInputVal('email');
    var mobile = getInputVal('mobile');
    var address = getInputVal('address');
  
    //console.log(city);

    // Save message
    //saveMessage(name, id, city, email, mobile, address);
   
    //getData("messages");
    //console.log("Done");
    //readcsv();

    realData(name, id, city, email, mobile, address);

    

    // Clear form
    //document.getElementById('contactForm').reset();
  }


  function getInputVal(data){
      return document.getElementById(data).value;
  }

//Save data to firebase
  function saveMessage(n,p,k,crop1, name, id, city, email, mobile, address){
    db.collection("messages").doc(id).set({
        n:n,
        p:p,
        k:k,
        crop: crop1,
        name: name,
        id: id,
        city: city,
        email: email,
        mobile: mobile,
        address: address
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Get data from firebase
function getData(data){
    db.collection(data).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
}

//Read our csv json file
function readcsv(n,p,k,name, id, city, email, mobile, address){
    var myInit = {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        mode: 'cors',
        cache: 'default'
    };

    let req = new Request("./data.json", myInit);

    fetch(req).then(function(res){
        return res.json();
    })
    .then(function(res){
        var min1 = 0, min2=0, min3=0;
        var c1=1000, c2=1000, c3=1000;
        console.log(n+" "+p+" "+k);
        //console.log(res[0]['Average Sodium % (dry)']);
        //console.log(res[0]['Average Phosphorus % (dry)']);
        //console.log(res[0]['Average Potassium % (dry)']);
        for(var i=0;i<737;i++){
            var dn = res[i]['Average Nitrogen % (dry)'];
            var dp = res[i]['Average Phosphorus % (dry)'];
            var dk = res[i]['Average Potassium % (dry)'];
            
            var val = diff(n,dn)+diff(p,dp)+diff(k,dk);
            if(c1>val){
                min3=min2;
                c3=c2;
                min2=min1;
                c2=c1;
                min1=i;
                c1=val;
            }else if(c2>val){
                min3=min2;
                c3=c2;
                min2=i;
                c2=val;
            }else if(c3>val){
                min3=i;
                c3=val;
            }
            
        }
        console.log(dn+" "+dp+" "+dk);

        console.log(val);
        var crop1 = res[min1]['Crop'];
        var crop2 = res[min2]['Crop'];
        var crop3 = res[min3]['Crop'];

        console.log(res[min1]['Crop']);
        console.log(res[min2]['Crop']);
        console.log(res[min3]['Crop']);

        saveMessage(n,p,k,crop1, name, id, city, email, mobile, address);
        var mess = "Favourable crop for your soil data are: \n"+"1."+crop1+" 2."+crop2+" 3."+crop3;
        document.getElementById("show").innerHTML = mess;
        document.getElementById("show").style.display='block';
    })
}

//Diffrence
function diff(a, b) {
    return Math.abs(a - b);
  }


//get npk values
function realData(name, id, city, email, mobile, address){
 
  firebase.database().ref().once('value').then(function(snapshot) {
  var data = snapshot.val();
  var str =JSON.stringify(data);
  str = str.slice(11,);
  //console.log(typeof str);
  console.log(str);
  
  n=parseFloat(str.slice(5,9));
  p=parseFloat(str.slice(10,14));
  k=parseFloat(str.slice(15,19));
  console.log(n+" "+p+" "+k);
  
  readcsv(n,p,k,name, id, city, email, mobile, address);

});
    
}