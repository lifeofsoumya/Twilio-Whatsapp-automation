const express = require('express')
require('dotenv').config();

const app = express();

app.get('/', (req, res)=>{
    res.send('working');
})

const PORT = process.env.port || 3000;

app.listen(PORT,()=>{
    console.log(`listening to Port: ${PORT}`)
})

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const client = require('twilio')(accountSid, authToken); 


function sendMsg(){

    client.messages 
    .create({ 
        body: "Soumya, You've a task", 
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+919734174147' 
    }) 
    .then(message => console.log(message.sid)) 
    .done();

}

// sendMsg()