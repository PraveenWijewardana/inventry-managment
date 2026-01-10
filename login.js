function btnLogin(){

    if(document.getElementById("email").value == null || document.getElementById("password").value ==null){
        Swal.fire({
        icon: "error",
        title: "Loin failed!"
});
    }else{
        window.location.href = "dashboard.html";
    }
}