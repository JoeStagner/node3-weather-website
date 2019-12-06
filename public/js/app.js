console.log('Client Javascript loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const messageOne =  document.querySelector('#message-1')
    const messageTwo =  document.querySelector('#message-2')
    messageOne.textContent = ''
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log("ERROR: " + data.error) 
                messageOne.textContent = "ERROR: " + data.error
            }
            else {
                console.log("LOCATION : " + data.location) 
                console.log("FORCAST : " +data.forcast) 

                messageOne.textContent = "LOCATION : " + data.location
                messageTwo.textContent = "FORCAST : " +data.forcast
            }
        })
    })  
})