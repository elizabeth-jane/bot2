const cron = require('node-cron');
const config = require('./config');
const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);

const generateJoke = require('./messages.js');

async function sendMessage() {
    try {
        const joke = await generateJoke();
        client.messages
            .create({
                body: joke,
                from: config.twilioNumber, 
                to: config.phoneNumber
            })
            .then(message => {
                console.log(joke);
            })
            .catch(err => {
                console.error('Error sending message:', err);
            });
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

cron.schedule('*/5 * * * *', () => {
    sendMessage();
});
