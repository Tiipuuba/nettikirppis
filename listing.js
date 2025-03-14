function createListing() {
    // Robert

    // get details
    const prod = document.getElementById('inputProduct').value
    const loc = document.getElementById('inputLocation').value
    const desc = document.getElementById('inputDescription').value
    const cost = document.getElementById('inputCost').value
    const user = localStorage.getItem('loggedUser')

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
    offerBox.setAttribute('id', 'changelater')
    offerBox.setAttribute('placeholder', 'lähetä viesti myyjälle.')

    const offerBtn = document.createElement("button")
    offerBtn.setAttribute('type', 'button')
    offerBtn.setAttribute('onclick', `sendMsg("${user}")`)
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
    var modal = bootstrap.Modal.getInstance(document.getElementById('listingModal'))
    modal.hide();
}

function sendMsg (receiver, item, sender, prevMsg) {
    if (prevMsg === 'startConversation') {
        var message = document.getElementById(receiver + item ).value
    } else {
        var message = document.getElementById(item + receiver).value
    }

    const users = JSON.parse(localStorage.getItem("users"))
    
    const msgreceiver = users.find(user => user.username === receiver)   
    msgreceiver.messages.push(`${sender}&${item}&${message}`)

    localStorage.setItem("users", JSON.stringify(users))
    console.log(message);
    
    
    if (prevMsg !== 'startConversation') {
        delMsg(sender, item, prevMsg)
    }
    
}

function delMsg(sender, item, msgContent) {
    console.log(sender);
    console.log(item);
    console.log(msgContent);
    
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