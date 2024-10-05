
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
