<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">

    <title>Crop Detector</title>
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="./index.html">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="./home.html">Admin Section<span class="sr-only">(current)</span></a>
              </li>
          </ul>
        </div>
      </nav>
<div class="d-flex justify-content-center align-items-center" style="margin:15px;">
        <h1 class="head">Crop Predictor</h1>
</div>

    <div class="container">
        
        <form action="" id="contactForm" method="post" >
            <div class="form-group">
                <label>Name: </label>
                <input type="text" name="name" id="name" class="form-control">
                <label>Unique ID: </label>
                <input type="text" name="id" id="id" class="form-control">
                <label>Mobile No: </label>
                <input type="number" name="mobile" id="mobile" class="form-control">
                <label>City: </label>
                <input type="text" name="city" id="city" class="form-control">
                <label>Email: </label>
                <input type="text" name="email" id="email" class="form-control">
                <label> Address: </label>
                <input type="text" name="address" id="address" class="form-control">
                <input type="file" name="file" id="file" class="form-control" style="display:none">
                <br>
                <div class="alert alert-primary" id="show" style="display:none;" role="alert">
                
                </div>
                <input type="submit" class="btn btn-primary">
            </div>

        </form>
       
        


        <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase.js"></script>
        <script src="./main.js"></script>



    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</body>

</html>