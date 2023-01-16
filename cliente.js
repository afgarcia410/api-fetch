var boton = document.getElementById('boton');
var boton2 = document.getElementById('boton2');
var nombre = document.getElementById('name').value;
var contraseña = document.getElementById('password').value;
var token;

async function login(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function init() {
    await login('http://localhost:3001/login', {
        name: nombre,
        password: contraseña
    }).then(res => {
        token = res.data.token;
        if(token && nombre && contraseña ){
            document.querySelector('form').style.display = 'none';
            document.getElementById('container').style.display = 'block';
            this.expression();
        }else{
            let contraseña = document.createElement('p');
            p.innerHTML = 'Fill the inputs'
            document.querySelector('form').appendChild(contraseña);
        }
        console.log("Token: " + token);
    }).catch(error => {
        console.log(error);
    });
}

boton.addEventListener('click', () =>{
    init();
})

async function request(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


function expression(){
    boton2.addEventListener('click', () =>{
        request("http://localhost:3001/request", 
        {
            regular_exp : document.getElementById('expression').value
        })
        .then(response => {
            console.log(response);
        }).catch(response => console.log(response));
    })
}