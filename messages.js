const axios = require('axios');

const generateQuote = async () => {
    try {
        const response = await axios.get('https://philosophy-quotes-api.glitch.me/quotes');
        const quotes = response.data;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].quote;
        return randomQuote;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return 'Something went wrong';
    }
};

module.exports = generateQuote;
