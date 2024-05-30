const cron = require('node-cron');
const config = require('./config');
const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);

const generateQuote = require('./messages.js');

async function sendMessage() {
    try {
        const quote = await generateQuote();
        client.messages
            .create({
                body: quote,
                from: config.twilioNumber, 
                to: config.phoneNumber
            })
            .then(message => {
                console.log(quote);
            })
            .catch(err => {
                console.error('Error sending message:', err);
            });
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

cron.schedule('*/5 * * * *', () => {
    sendMessage();
});
