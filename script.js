document.getElementById('usernameButton').addEventListener('click', function(event) {
    document.getElementById('topInput').innerHTML = '<input type="text" id="Input" class="inputStyling" placeholder="Username" value="username">'
    document.getElementById('usernameEmail').style.visibility = "visible";
    document.getElementById('passwordDiv').style.visibility = "visible";
    document.getElementById('logInDiv').style.visibility = "visible";
    console.log(document.getElementById('Input').getAttribute('value'))
});

document.getElementById('emailButton').addEventListener('click', function(event) {
    document.getElementById('topInput').innerHTML = '<input type="text" id="Input" class="inputStyling" placeholder="Email Address" value="email">'
    document.getElementById('usernameEmail').style.visibility = "visible";
    document.getElementById('passwordDiv').style.visibility = "visible";
    document.getElementById('logInDiv').style.visibility = "visible";
    console.log(document.getElementById('Input').getAttribute('value'))
})

document.getElementById('login').addEventListener('click', function(event) {
    if (document.getElementById('Input').getAttribute('value') == "email") {
        var emailAddress = document.getElementById('Input').value;
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
                    document.getElementById('Input').classList.add("validEmail");
                    document.getElementById('Input').classList.remove('invalidEmail');

                } else {
                    results += "<span class='invalid'>Please enter a valid email address.</span>";
                    const Input = 'Input';
                    document.getElementById(Input).classList.add("invalidEmail");
                    document.getElementById(Input).classList.remove('validEmail');
                }
                document.getElementById('validity').innerHTML = results;
            });

    } else if (document.getElementById('Input').getAttribute('value') == "username") {
        value = document.getElementById('Input').getAttribute('value');
        console.log(`Username Input is ${value}.`);
    } else {
        //throw error message
        console.log("error!!")
        let results ="<span class='invalid'>Please enter valid email address.</span>";
        document.getElementById('validity').innerHTML = results;
    }
})