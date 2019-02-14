document.getElementById('usernameButton').addEventListener('click', function(event) {
    document.getElementById('input').innerText = "Username";
    document.getElementById('usernameEmail').style.visibility = "visible";
    document.getElementById('passwordDiv').style.visibility = "visible";
    document.getElementById('logInDiv').style.visibility = "visible";
});

document.getElementById('emailButton').addEventListener('click', function(event) {
    document.getElementById('input').innerText = "Email";
    document.getElementById('usernameEmail').style.visibility = "visible";
    document.getElementById('passwordDiv').style.visibility = "visible";
    document.getElementById('logInDiv').style.visibility = "visible";
})

document.getElementById('logIn').addEventListener('click', function(event) {
    var value = "";
    if (document.getElementById('input').innerText === "Email") {
        value = document.getElementById('usernameEmailInput').value;
        console.log(`Email Input is ${value}.`);
    } else if (document.getElementById('input').innerText === "Username") {
        value  = document.getElementById('usernameEmailInput').value;
        console.log(`Username Input is ${value}.`);

    } else {
        //throw error message
        console.log("error!!")
    }
})