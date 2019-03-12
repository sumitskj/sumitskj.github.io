document.getElementById('loginForm').addEventListener('submit', login);

function login(e){
    e.preventDefault();

    var user = document.getElementById('name').value;
    var pass = document.getElementById('password').value;

    if(user==="crop" && pass==="crop"){
        window.location = "./admin.html";
    }else{
        document.getElementById('show').style.display='block';
    }
}