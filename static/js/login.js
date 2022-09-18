const form = document.querySelector("form")
form.addEventListener('submit', requestLogin)

async function requestLogin(e){
    e.preventDefault();
    const email = document.getElementById("inputEmail3").value
    const password = document.getElementById("inputPassword3").value
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email:email,password:password})
        }
 
        const r = await fetch("http://localhost:3000/users/login", options)
        const data = await r.json()

        if (!data.success) { throw new Error('Login not authorised'); }

        login(data.token);
        if(data.success){
            console.log("Login successful")
            window.location.replace('./view.html')
        }else {
            console.log("Login failed")
        }
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("userID", user._id);
    localStorage.setItem("userEmail", user.email);
}
