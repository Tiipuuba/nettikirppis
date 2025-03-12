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

function sendMsg (seller, item) {
    const message = document.getElementById(seller + item).value
    const buyer = localStorage.getItem('loggedUser')

    
}

function delMsg() {
    console.log("poistettu");
    
}

function createMsg() {

    // !temporary!
    const name = "Kissa"

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
    title.innerText = name
    const del = document.createElement('h5')
    del.classList.add('delMsg')
    del.setAttribute('onclick', 'delMsg()')
    del.innerText = "X"

    titlendel.appendChild(title)
    titlendel.appendChild(del)
    cardbody.appendChild(titlendel)






    card.appendChild(cardbody)
    document.getElementById('msgBox').appendChild(card)
}