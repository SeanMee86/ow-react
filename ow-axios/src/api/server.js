const express = require('express');
const app = express();

app.get('/api/v1/hero', (req, res) => {
    res.send('working')
});

app.listen(4000, () => console.log(`Listening on Port: 4000`));