const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Function to apply the correct theme
function applyTheme() {
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-theme");
        toggleButton.textContent = "Switch to Light Mode";
    } else {
        body.classList.remove("dark-theme");
        toggleButton.textContent = "Switch to Dark Mode";
    }
}

// Apply theme on page load
applyTheme();

// Toggle theme on button click
toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    // Save theme preference
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");

    applyTheme(); // Update button text
});

// Tarkistaa onko käyttäjä kirjautunut
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("buttonlogin");
    const logoutButtonStore = document.getElementById("logoutbuttonStore");
    const logoutButtonIndex = document.getElementById("logoutbuttonIndex");
    const logoutButtonProfile = document.getElementById("logoutbuttonProfile");
    const profileButton = document.getElementById("profileb");
    const adButton =document.getElementById("ad");


    const loggedUser = localStorage.getItem("loggedUser");
    console.log("loggedUser:", loggedUser);

    if (loggedUser && loggedUser.trim() !== "") {
        if (loginButton) loginButton.style.display = "none";
        if (logoutButtonStore) logoutButtonStore.style.display = "block";
        if (logoutButtonIndex) logoutButtonIndex.style.display = "block";
        if (logoutButtonProfile) logoutButtonProfile.style.display = "block";
        if (profileButton) profileButton.style.display = "block";
        if (adButton) adButton.style.display = "block";

    } else {
        if (loginButton) loginButton.style.display = "block";
        if (logoutButtonStore) logoutButtonStore.style.display = "none";
        if (logoutButtonIndex) logoutButtonIndex.style.display = "none";
        if (logoutButtonProfile) logoutButtonProfile.style.display = "none";
        if (profileButton) profileButton.style.display = "none";
        if (adButton) adButton.style.display = "none";

    }

    if (logoutButtonStore) {
        logoutButtonStore.addEventListener("click", kirjauduUlos);
    }
    if (logoutButtonIndex) {
        logoutButtonIndex.addEventListener("click", kirjauduUlos);
    }
    if (logoutButtonProfile) {
        logoutButtonProfile.addEventListener("click", kirjauduUlos);
    }
});



function avaaRekisterointi() {
    document.getElementById("loginform").style.display = "none";
    document.getElementById("registerform").style.display = "block";
}

// Rekisteröintilomake
function rekisteroidy() {
    let newUsername = document.getElementById("newUsername").value;
    let email = document.getElementById("email").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let age = document.getElementById("birthdate").value;

    let registerErrorElement = document.getElementById("registererror");
    registerErrorElement.style.display = "none";

    let users = JSON.parse(localStorage.getItem("users")) || [];

// Tarkistaa onko kaikki input kentät täytettynä
    if (newUsername === "" || email === "" || newPassword === "" || confirmPassword === "" || age === "") {
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

// Testaa sähköpostin muodon
    let emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailTest.test(email)) {
        registerErrorElement.style.display = "block";
        registerErrorElement.textContent = "Virheellinen sähköpostiosoite";
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
        password: newPassword,
        birthdate: age,
        messages: [
            "Jimmy&Sohva&Test message"
        ]
    };


    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));


    window.location.href = "login.html";
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
        localStorage.setItem("loggedUser", user.username)
        console.log("Kirjautunut:" + user.username)
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

function kirjauduUlos () {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html"; 

    console.log("Käyttäjä on kirjautunut ulos");
}

//Logoa painamalla palaa etusivulle
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("responsivelogo").addEventListener("click", function() {
        window.location.href = "index.html"; 
    });
});