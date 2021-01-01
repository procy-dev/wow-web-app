const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const path = require('path');

const apiAuth = {
    key: 'e5337f521969f78cfeada2e591d4efbc'
}

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/test', (req, res) => {
    return res.send('pass');
});

// Warcraft Logs API v1 Endpoints
app.get('/rankings/:char/:server/:region', (req, res) => {
    const { char, server, region } = req.params;
    const WL_API_RANK = encodeURI(`https://www.warcraftlogs.com:443/v1/rankings/character/${char}/${server}/${region}?api_key=${apiAuth.key}`);
    console.log(WL_API_RANK);

    axios({
        method: 'get',
        url: WL_API_RANK,
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => res.json(response.data))
    .catch(err => console.log(`ERROR RETRIEVING INFO`, err));
});

app.listen(process.env.PORT || 8080);