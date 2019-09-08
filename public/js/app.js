console.log('Client side javascript page is loaded')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

if(message1){
    console.log("Checking message")
    message1.textContent = 'Loading...'  
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{

response.json().then((data)=>{

    if(data.error){
    console.log(data.error)
    }
    else{
        if(message1){
            console.log("Checking message")
       message1.textContent=data.forecast.temperature
        }
    }
    })
})
})