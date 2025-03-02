// Käyttäjän ominaisuudet
let kayttaja = {
    name: "Pirkko",
    password: "salasana",
    messages: {
    }
}

// Ostajan "viestin" sisältö
let ostaja = "Vesa"
let tarjous = "2e"

// Viesti lisätään myyjän profiiliin
kayttaja.messages[ostaja] = [tarjous]

//Muutetaan oikeaan muotoon ja tallennetaan localstorageen
localStorage.setItem('Pirkko', JSON.stringify(kayttaja))

// Puretaan ja tuodaan käyttäjä localstoragesta
var parsittu = JSON.parse(localStorage.getItem('Pirkko'))

// Näillä voi hakea tiedot ja käydä viestit läpi
// esim kun näytetään viestit profiilissa
console.log(parsittu.name, parsittu.password);

for (let message in parsittu.messages) {
    console.log(message + ": " + parsittu.messages[message]);
}

// Poistaa viestin
delete parsittu.messages['Vesa']


//Mona
function avaaRekisterointi() {
    document.getElementById("loginform").style.display = "none";
    document.getElementById("registerform").style.display = "block";
}

function rekisteroidy() {
    let newUsername = document.getElementById("newUsername").value;
    let email = document.getElementById("email").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let registerErrorElement = document.getElementById("registererror");
    registerErrorElement.style.display = "none";

    let users =JSON.parse(localStorage.getItem("users")) || [];

// Tarkistaa onko kaikki input kentät täytettynä
    if (newUsername === "" || email === "" || newPassword === "" || confirmPassword === "") {
        registerErrorElement.style.display = "block";
        registerErrorElement.textContent = "Täytä puuttuvat kentät";
        return;
    }

// Tarkistaa täsmäävätkö salasanat toisiinsa
    if (newPassword !== confirmPassword) {
        registerErrorElement.style.display = "block";
        registerErrorElement.textContent = "Salasanat eivät täsmää";
        return;
    }

// Tarkistaa onko käyttäjätunnus jo käytössä
    if (users.some(user => user.username === newUsername)) {
        registerErrorElement.style.display = "block";
        registerErrorElement.textContent = "Käyttäjätunnus on jo rekisteröity";
        return;
    }

// Tarkistaa onko sähköpostiosoite jo käytössä
    if (users.some(user => user.email === email)) {
        registerErrorElement.style.display = "block";
        registerErrorElement.textContent = "Sähköpostiosoite on jo rekisteröity";
        return;
    }

// Tarkistaa salasana vaatimukset 
    let passwordCharacter = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    
    if(!passwordCharacter.test(newPassword)) {
        registerErrorElement.style.display = "block";
        registerErrorElement.textContent = "Salasanan on oltava vähintään 8 merkkiä pitkä ja sisältää yhden erikoismerkin";
        return;
    }

    let user = {
        username: newUsername,
        email: email,
        password: newPassword
    };


    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));


    window.location.href = "store.html";
}

function kirjaudu() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("userpassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("loginerror").style.display = "none";

    if (username === "" || password ==="") {
        return;
    }

    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = "store.html";
    } else {
        document.getElementById("loginerror").style.display = "block";
    }
}

// Tyhjentää rekisteröintilomakkeelta kentät ja ohjaa takaisin kirjautumislomakkeelle
function peruutaRekisterointi() {
    document.getElementById("newUsername").value = "";
    document.getElementById("email").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    document.getElementById("registerform").style.display = "none";
    document.getElementById("loginform").style.display = "block";
}

// Tyhjentää kirjautumislomakkeelta kentät ja ohjaa etusivulle
function peruutaKirjautuminen() {
    document.getElementById("username").value = "";
    document.getElementById("userpassword").value = "";

    window.location.href = "index.html";
}

//Logoa painamalla palaa etusivulle
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("responsivelogo").addEventListener("click", function() {
        window.location.href = "index.html"; 
    });
});