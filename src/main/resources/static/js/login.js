const loginBtn = document.getElementById(`login-btn`)
const registerBtn = document.getElementById(`register-btn`)
const userInput = document.getElementById(`user-input`)
const passInput = document.getElementById(`pass-input`)
const loginForm = document.getElementById(`login-form`)
const textOutCont = document.getElementById(`text-out-cont`)

const headers = {
    "Content-Type":`application/json`
}

const baseUrl = `http://localhost:8080/cat-a-combs/users`

async function handleRegister(e) {
    e.preventDefault()

    let bodyObj = {
        username: userInput.value,
        password: passInput.value
    }

    const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(error => console.error(error.message))
        .catch(console.log(bodyObj))
    const responseArr = await response.json()

    if (response.status === 200) {
        console.log(responseArr[0])

        let regConf = document.createElement(`p`)
        regConf.setAttribute(`class`, `login-text`)
        regConf.innerHTML = `Account registered...`
        textOutCont.appendChild(regConf)
        //visual confirmation of successful registration here
    }
} 

async function handleLogin(e) {
    e.preventDefault()

    let bodyObj = {
        username: userInput.value,
        password: passInput.value
    }

    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(error => console.error(error.message))

    const responseArr = await response.json()

    if (response.status === 200) {
        document.cookie = `userId=${responseArr[1]}`
        window.location.replace(responseArr[0])
        console.log("user logged in")
    }
} 


loginBtn.addEventListener("click", handleLogin)
registerBtn.addEventListener("click", handleRegister)