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

document.getElementById('get').addEventListener('click', showdata);

function showdata(){
    getData("messages");
}

function getData(data){
    db.collection(data).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().name);

            var table = document.getElementById('table');
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            var cell8 = row.insertCell(7);
            var cell9 = row.insertCell(8);
            var cell10 = row.insertCell(9);


            cell1.innerHTML = doc.data().id;
            cell2.innerHTML = doc.data().name;
            cell3.innerHTML = doc.data().city;
            cell4.innerHTML = doc.data().mobile;
            cell5.innerHTML = doc.data().email;
            cell6.innerHTML = doc.data().n;
            cell7.innerHTML = doc.data().p;
            cell8.innerHTML = doc.data().k;
            cell9.innerHTML = doc.data().crop;

        });
    });



}