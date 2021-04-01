let txtName = document.getElementById("txtName");
let content = document.getElementById("content");


function greetUser() {
    let userName = txtName.value;
    let phrase = createPhrase(userName);
    

    content.innerHTML = phrase;
    console.log(phrase);

    txtName.value = "";
}

function createPhrase(userName) {
    let phrase = "Hello " + userName;
    return phrase;
}  