let txtUsername = document.getElementById("txtUsername");
let txtPassword = document.getElementById("txtPassword");
let content = document.getElementById("content");

function verifyLogin() {
    let username = txtUsername.value;
    let password = txtPassword.value;

    if (username == "Username" && password == "Password") {
        content.innerHTML = "Success";
    } else {
        content.innerHTML = "Wrong information";
    }

    txtUsername.value = "";
    txtPassword.value = "";
}