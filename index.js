const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require("cors");
require('dotenv').config()
var WebSocketServer = require("ws").Server;

const app = express();

app.use(bodyparser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
var server = app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})


app.post("/login", async (req, res) => {
    // create token
    const token = jwt.sign({
        name: req.body.name,
        id: req.body.id
    }, process.env.TOKEN_SECRET, 
    { expiresIn : 600 });

    res.header('auth-token', token).json({
        error: null,
        data: { token }
    });
});


const wss = new WebSocketServer({ server: server, path: '/request' });

wss.on('connection', (ws, req) => {
  var token = url.parse(req.url, true).query.token;

  jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
          ws.close();
      } else {
          ws.send('You are not logged');
      }
  });

  ws.on('message', (data) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                client.send("Error: Your token is no longer valid. Please reauthenticate.");
                client.close();
            } else {
                client.send(wsUsername + ": " + data);
            }
    })
});

});