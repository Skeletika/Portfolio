function showpassword(){
    let visibility = document.getElementById("vision"); 
    let password = document.getElementById("password");

    if (password.type === "password") { 
        password.type = "text";
        visibility.src = "icons/icon-hidden.svg";
        visibility.alt = "icon-hidden";
        visibility.title = "Cacher";
    }
    else {
        password.type = "password";
        visibility.src = "icons/icon-visibility.svg";
        visibility.alt = "icon-visibility";
        visibility.title = "Montrer";
    }

}