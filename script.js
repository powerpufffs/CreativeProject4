document.getElementById('usernameButton').addEventListener('click', function(event) {
    document.getElementById('topInput').innerHTML = '<input type="text" id="usernameEmailInput" class="inputStyling" placeholder="Username">'
    document.getElementById('usernameEmail').style.visibility = "visible";
    document.getElementById('passwordDiv').style.visibility = "visible";
    document.getElementById('logInDiv').style.visibility = "visible";
});

document.getElementById('emailButton').addEventListener('click', function(event) {
    document.getElementById('topInput').innerHTML = '<input type="text" id="usernameEmailInput" class="inputStyling" placeholder="Email Address">'
    document.getElementById('usernameEmail').style.visibility = "visible";
    document.getElementById('passwordDiv').style.visibility = "visible";
    document.getElementById('logInDiv').style.visibility = "visible";
})

document.getElementById('logIn').addEventListener('click', function(event) {
    if (document.getElementById('input').innerText === "Email") {
        var emailAddress = document.getElementById('usernameEmailInput').value;
        console.log(`Email Input is ${emailAddress}.`);
        const accessKey = "81a42f979a60a5020baa7b1ec7c058e5";
        const url = "http://apilayer.net/api/check?access_key=" + accessKey + "&email=" + emailAddress;
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                let results = "";
                console.log(json);
                if (json.score >= 0.8 || json.format_valid === true) {
                    results += "<span class='valid'> Valid </span>";
                } else {
                    results += "<span class='invalid'>Invalid email address.</span>";
                }
                document.getElementById('validity').innerHTML = results;
            });

    } else if (document.getElementById('input').value == "Username") {
        value  = document.getElementById('usernameEmailInput').value;
        console.log(`Username Input is ${value}.`);
    } else {
        //throw error message
        console.log("error!!")
    }
})