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
