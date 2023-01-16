const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(bodyparser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor arrancado en: ${PORT}`)
})

app.post("/login", async (req, res) => {
    // create token
    const token = jwt.sign({
        name: req.body.name,
        id: req.body.id
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
        error: null,
        data: { token }
    });
});

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Acceso denegado'})
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next() 
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

app.post('/request', verifyToken, (req, res) => {
    res.json('correct token')
})