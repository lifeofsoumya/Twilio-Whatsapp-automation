const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.get('/', (req, res)=>{
    res.send('working');
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening to Port: ${port}`)
})

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const client = require('twilio')(accountSid, authToken, { 
    lazyLoading: true 
});


function sendMsg(message, senderID){

    client.messages 
    .create({ 
        body: "Soumya, You've a task", 
        from: 'whatsapp:+14155238886',       
        to: senderID
    }) 
    .then(message => console.log(message.sid)) 
    .done();

}

// sendMsg()


// Route for WhatsApp
app.post('/whatsapp', async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;

    console.log(message);
    console.log(senderID);

    // Write a function to send message back to WhatsApp
    if(message=='hi' || 'hello' || 'hi there'){
        await sendMsg('Hello Soumya', senderID);
    }
    else if(message=='time'){
        await sendMsg('The current time is ', senderID);
    }

});