function updateListings() {
    if (localStorage.getItem('listings') === null) {
        list = {}
        localStorage.setItem('listings', JSON.stringify(list))
    }

    const listings = JSON.parse(localStorage.getItem('listings'))

    for (let x in listings) {
        
        const tiedot = listings[x]
        createListing(tiedot[0], tiedot[1], tiedot[2], tiedot[3], tiedot[4])
    }
}

function createListing(p, l, d, c, u) {

    // get details
    if (p === undefined) {
        var prod = document.getElementById('inputProduct').value
        var loc = document.getElementById('inputLocation').value
        var desc = document.getElementById('inputDescription').value
        var cost = document.getElementById('inputCost').value
        var user = localStorage.getItem('loggedUser')
        
        var newListing = [prod, loc, desc, cost, user]

        if (localStorage.getItem('listings') === null) {
            list = {}
            localStorage.setItem('listings', JSON.stringify(list))
        } else if (localStorage.getItem('listings') !== null) {
            const listings = JSON.parse(localStorage.getItem('listings'))
            listings.push(newListing)
            localStorage.setItem('listings', JSON.stringify(listings))
        }
        var modal = bootstrap.Modal.getInstance(document.getElementById('listingModal'))
        modal.hide();

    } else if (p !== undefined){
        var prod = p
        var loc = l
        var desc = d
        var cost = c
        var user = u
    }

    // create card frame and such for listing
    const container = document.createElement("div")
    container.classList.add('container')

    const card = document.createElement("div")
    card.classList.add('card')

    const cardbody = document.createElement("div")
    cardbody.classList.add('card-body')

    // give listing card its details
    const title = document.createElement("h5")
    title.classList.add('card-title')
    title.innerText = prod
    cardbody.appendChild(title)

    const location = document.createElement("h6")
    location.classList.add('card-subtitle', 'mb-2', 'text-muted')
    location.innerText = loc
    cardbody.appendChild(location)

    const listBy = document.createElement("a")
    listBy.classList.add('mb2')
    listBy.innerText = user
    cardbody.appendChild(listBy)

    cardbody.appendChild(document.createElement("p"))

    const description = document.createElement("p")
    description.classList.add('card-text')
    description.innerText = desc
    cardbody.appendChild(description)

    const prodCost = document.createElement("p")
    prodCost.classList.add('card-text', 'text-muted')
    prodCost.innerText = 'Hintapyyntö: ' + cost
    cardbody.appendChild(prodCost)

    // create message/offer box
    const offer = document.createElement("form")
    offer.classList.add('form-inline')

    const offerDiv = document.createElement("div")
    offerDiv.classList.add('form-group')

    const offerBox = document.createElement("input")
    offerBox.setAttribute('type', 'text')
    offerBox.setAttribute('id', `${user}${prod}`)
    offerBox.setAttribute('placeholder', 'lähetä viesti myyjälle.')

    const offerBtn = document.createElement("button")
    offerBtn.setAttribute('type', 'button')
    offerBtn.setAttribute('onclick', `sendMsg("${user}", "${prod}", "${localStorage.getItem("loggedUser")}", "startConversation")`)
    offerBtn.classList.add('btn', 'btn-primary', 'mb-2')
    offerBtn.innerText = "Lähetä"

    const img = document.createElement("img")
    img.setAttribute('src', 'img/imgnotfound.png')
    img.classList.add('card-img-top')

    offerDiv.appendChild(offerBox)
    offerDiv.appendChild(offerBtn)
    offer.appendChild(offerDiv)
    cardbody.appendChild(offer)

    // add rest together
    card.appendChild(cardbody)
    card.appendChild(img)
    container.appendChild(card)
    document.getElementById('storeContainer').appendChild(container)
    
    // Close modal when done

}

function sendMsg (receiver, item, sender, prevMsg) {

    if (localStorage.getItem("loggedUser") === null) {
        window.alert("Et voi lähettää viestiä kirjautumatta!");
        return;
    }

    if (prevMsg === 'startConversation') {
        var message = document.getElementById(receiver + item ).value
        document.getElementById(receiver + item ).value = ""
    } else {
        var message = document.getElementById(item + receiver).value
    }

    const users = JSON.parse(localStorage.getItem("users"))
    
    const msgreceiver = users.find(user => user.username === receiver)   
    msgreceiver.messages.push(`${sender}&${item}&${message}`)

    localStorage.setItem("users", JSON.stringify(users))
    window.alert("Lähetetty.");
    
    
    if (prevMsg !== 'startConversation') {
        console.log(receiver, item, prevMsg);
        
        delMsg(receiver, item, prevMsg)
    }
    
}

function delMsg(sender, item, msgContent) {
    
    const logged = localStorage.getItem("loggedUser")

    const users = JSON.parse(localStorage.getItem("users"))
    const msgreceiver = users.find(user => user.username === logged)

    const index = msgreceiver.messages.indexOf(`${sender}&${item}&${msgContent}`)

    if (index !== -1) {
        msgreceiver.messages.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
    }
    location.reload()
}

function updateMsgs() {

    const logged = localStorage.getItem("loggedUser")
    const users = JSON.parse(localStorage.getItem("users"))

    const currentUser = users.find(user => user.username === logged)

    for ( let x in currentUser.messages) {
        let msginfo = currentUser.messages[x].split("&");      
        createMsg(msginfo[0], msginfo[1], msginfo[2])
    } 
}

function createMsg(senderName, itemName, msgContent) {

    // new card and cardbody
    const card = document.createElement('div')
    card.classList.add('card')

    const cardbody = document.createElement('div')
    cardbody.classList.add('card-body')

    // card content
        // card title and delete button
    const titlendel = document.createElement('div')
    titlendel.classList.add('d-flex', 'justify-content-between')

    const title = document.createElement('h5')
    title.innerText = itemName
    const del = document.createElement('h5')
    del.classList.add('delMsg')
    del.setAttribute('onclick', `delMsg("${senderName}", "${itemName}", "${msgContent}")`)
    del.innerText = "X"

    titlendel.appendChild(title)
    titlendel.appendChild(del)
    cardbody.appendChild(titlendel)

        // card buyer and message
    const buyerName = document.createElement('a')
    buyerName.classList.add('mb2')
    buyerName.setAttribute('href', "#")
    buyerName.innerText = senderName

    const space = document.createElement('p')

    const message = document.createElement('p')
    message.classList.add('card-text')
    message.innerText = msgContent

    cardbody.appendChild(buyerName)
    cardbody.appendChild(space)
    cardbody.appendChild(message)

        // reply box
    const offer = document.createElement("form")
    offer.classList.add('form-inline')

    const offerDiv = document.createElement("div")
    offerDiv.classList.add('form-group')

    const offerBox = document.createElement("input")
    offerBox.setAttribute('type', 'text')
    offerBox.setAttribute('id', `${itemName}${senderName}`)
    offerBox.setAttribute('placeholder', 'Vastaa ostajalle')

    const offerBtn = document.createElement("button")
    offerBtn.setAttribute('type', 'button')
    offerBtn.setAttribute('onclick', `sendMsg("${senderName}", "${itemName}", "${localStorage.getItem("loggedUser")}", "${msgContent}")`)
    offerBtn.classList.add('btn', 'btn-primary', 'mb-2')
    offerBtn.innerText = "Vastaa"

    offerDiv.appendChild(offerBox)
    offerDiv.appendChild(offerBtn)
    offer.appendChild(offerDiv)
    cardbody.appendChild(offer)

    // assemble rest
    card.appendChild(cardbody)
    document.getElementById('msgBox').appendChild(card)
}