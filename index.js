const express = require('express');
const { getIconsUrl } = require('./flaticon-scrapper');
const fs = require('fs/promises');
const cards = require('./cards.json');

const app = express();
const PORT = 3000;

app.use(express.static('./clientApp/dist'));

app.get('/api/icons/search', async (req, res) => {
    const query = req.query.query;

    if (!query)
        return res.status(400).json({ error: 'Query parameter is required' });

    getIconsUrl(query)
        .then(urls => { res.json(urls); })
        .catch(error => { console.log(error); res.json([]); });
});

app.get('/api/cards/catalog', async (req, res) => {
    res.json(cards);
})

app.get('/api/cards/random/:category', async (req, res) => {
    const category = req.params.category;

    if (!(['auditory', 'extroverted', 'introverted', 'kinestetic', 'visual'].includes(category))) {
        // res.json({ name: '', path: '' });
        res.status(404).end();
        return;
    }

    const parts = Object.keys(cards);
    const randomPart = parts[Math.floor(Math.random() * parts.length)];
    const cardList = Object.keys(cards[randomPart][category])
    const randomCard = cardList[Math.floor(Math.random() * cardList.length)]

    res.json(cards[randomPart][category][randomCard]);
    // res.redirect(cards[randomPart][category][randomCard].path)
})

app.get('/{*splat}', (_, res) => {
    res.sendFile('index.html', { root: './clientApp/dist' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).addListener("error", (err) => console.log(err));

module.exports = app;