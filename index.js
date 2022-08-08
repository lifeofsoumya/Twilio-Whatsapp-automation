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
let urls = []; 
let urlAdd;
let urlArr = [];

const client = require('twilio')(accountSid, authToken, { 
    lazyLoading: true 
});


function sendMsg(message, senderID){

    client.messages 
    .create({ 
        body: message,
        from: 'whatsapp:+14155238886',
        to: senderID
    }) 
    .then(message => console.log(message.sid)) 
    .done();

}

// sendMsg()
const fetchExpenses = ()=>{
    let expenses = "Current situation: Electric Bill 3300, Powerbank 1600, Invest 3000, Hdd 4500, Hosting 2000, Raspi 9500, Cargo 1200, Travel 10000, renewal domain 6000"
}
fetchExpenses()

// Route for WhatsApp
app.post('/whatsapp', async (req, res) => { // creates webhook

    var message = req.body.Body;
    let senderID = req.body.From;

    console.log(message);
    console.log(senderID);

    // Write a function to send message back to WhatsApp
    if(message==='list'){
        await sendMsg('Use the Following commands: Hi | link | resume | github | turn off light | list: | post | my day | projects | indgeek | my site | sites | expense | addurl.site.com', senderID);
        message = "";
    }
    else if(message==='hi'){
        await sendMsg('Hello Soumya', senderID);
        message = "";
    }
    else if(message==='link'){
        await sendMsg('Your links are here: https://soumyamondal.com/link', senderID);
        message = "";
    }
    else if(message==='resume'){
        await sendMsg('Your Resume link: https://soumyamondal.com/resume', senderID);
        message = "";
    }
    else if(message==='github'){
        await sendMsg('Your github: https://github.com/lifeofsoumya', senderID);
        message = "";
    }
    else if(message==='turn off light'){
        await sendMsg('Your light is being turned off', senderID);
        message = "";
    }
    else if(message==='list:'){
        await sendMsg('Here is your list:', senderID);
        message = "";
    }
    else if(message==='post'){
        await sendMsg('Your photo was posted to all social media Platforms', senderID);
        message = "";
    }
    else if(message==='my day'){
        await sendMsg('Starting your day with curated news for you', senderID);
        message = "";
    }
    else if(message==='projects'){
        await sendMsg('Here is your chat app: ⚪ https://soumyamondal.com/project/chatapp; Stock Notifier: ⚪ https://soumyamondal.com/project/stockalert', senderID);
        message = "";
    }
    else if(message==='my site'){
        await sendMsg('Here are your site useful links: ⚪ https://soumyamondal.com/about; ⚪ https://soumyamondal.com/newsletter; ⚪ https://soumyamondal.com/blog; ⚪ https://soumyamondal.com/admin; ⚪ https://soumyamondal.com/coffee; ⚪ https://soumyamondal.com/courses; ⚪ https://soumyamondal.com/faq; ', senderID);
        message = "";
    }
    else if(message==='indgeek'){
        await sendMsg('Here are IndGeek useful links: ⚪ https://indgeek.com/index; ⚪ https://indgeek.com/about-us/; ⚪ https://indgeek.com/contact; ⚪ https://indgeek.com/sitemap/; ⚪ https://indgeek.com/intern/; ⚪ https://indgeek.com/forum/; ', senderID);
        message = "";
    }
    else if(message==='sites'){
        await sendMsg('Here are your websites: ⚪ https://soumyamondal.com; ⚪ https://indgeek.com; ⚪ https://turbohosty.com; ⚪ https://pepeso.com; ⚪ https://ecoesports.com; ⚪ https://truelancing.com; ⚪ https://metatool.in; ⚪ https://nated.in; ', senderID);
        message = "";
    }
    else if(message==='expense'){
        await sendMsg(`Your upcoming expenses: ${expenses}`, senderID);
        message = "";
    }
    else if(message==='okay'){
        await sendMsg('Chalo bye, cya', senderID);
        message = "";
    }
    else if(message.includes('addurl')){
        urlAdd = message.replace('addurl.', ''); // adding url
        urls.push(urlAdd);
        urlArr = [];
        for(let i = 0; i < urls.length; i++){
            urlArr.push(urls[i]);
            urlArr.push(" ⚪ ");
        }
        await sendMsg(urlArr, senderID);
        message = "";
    }
});
