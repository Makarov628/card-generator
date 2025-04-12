const express = require('express');
const { getIconsUrl } = require('./flaticon-scrapper');

const app = express();
const PORT = 3000;

app.use(express.static('./clientApp/dist'));

app.get('/api/icons/search', async (req, res) => {
    const query = req.query.query;

    if (!query)
        return res.status(400).json({ error: 'Query parameter is required' });

    getIconsUrl(query)
        .then(urls => { res.json(urls); })
        .catch(error => { res.status(500).json(error.message); });
});

app.get('/{*splat}', (_, res) => {
    res.sendFile('index.html', { root: './clientApp/dist' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// module.exports = app;