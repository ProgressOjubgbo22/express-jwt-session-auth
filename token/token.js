// npm install express jsonwebtoken bcrypt
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [];
const secretkey = 'my_secret_key';

function isauthenticated(req, res, next){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }
    jwt.verify(token, secretkey, (err, user) => {
        if(err){
            return res.status(403).json({message: "forbidden"});
        }
        req.user =user;
        next();
    })
}

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({username, password: hashedPassword});
    res.json({message: "user registered successfully"});
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username);
    if(!user){
        return res.status(400).json({message: "invalid credentials"});
    }
    const isMathch = await bcrypt.compare(password, user.password);
    if(isMathch){
        const token = jwt.sign({username: user.username}, secretkey, {expiresIn: '1h'});
        res.json({token});
    }
})

router.get('/profile', isauthenticated, (req, res) => {
    res.json({username: req.user.username});
})

router.post('/logout', (req, res) => {
    res.json({message: "logout successful"});
})

module.exports = router;
