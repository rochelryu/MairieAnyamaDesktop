const express = require('express');
const jsonServer = require('json-server')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('build/index.html'));
});

app.get('/remote', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', jsonServer.router('./src/config.json'));

app.listen(process.env.PORT || 8080);