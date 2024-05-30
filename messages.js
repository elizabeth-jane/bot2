const axios = require('axios');

const generateJoke = async () => {
    try {
        const response = await axios.get('https://icanhazdadjoke.com/');
        const jokes = response.data;
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)].joke;
        return randomJoke;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Something went wrong';
    }
};

module.exports = generateJoke;
