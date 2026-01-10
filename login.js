function btnLogin(){

    if(document.getElementById("email").value =="admin" && document.getElementById("password").value=="admin123"){
        window.open("page.html");

    }else{
         Swal.fire({
        icon: "error",
        title: "Loin failed!"
        });
    }
}