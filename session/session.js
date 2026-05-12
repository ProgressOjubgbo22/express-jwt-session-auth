// npm install express express-session bcrypt
const express = require('express');
const router = express.Router();
const bycrpt = require("bcrypt");

const users = [];

function isauthenticated(req, res, next) {
    if(req.session.userid) {
        next();
    }
    return res.status(401).json({message: "unauthorized"});
}

router.post("/register", async(req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: "username and password are required"});
    }
    const user = users.find(u => u.username === username);
    if(user){
        return res.status(400).json({message: "username already exists"});
    }
    const hashedPassword = await bycrpt.hash(password, 10);
    users.push({username, password: hashedPassword});
    res.status(201).json({message: "user created successfully"});
})

router.post("/login", async(req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: "username and password are required"});
    }
    const user = users.find(u => u.username === username);
    if(!user){
        return res.status(400).json({message: "invalid username or password"});
    }
    const ismatch = await bycrpt.compare(password, user.password);
    if(!ismatch){
        return res.status(400).json({message: "invalid username or password"});
    }
    req.session.userid = user.username;
    res.json({message: "login successful"});
})

router.get("/profile", isauthenticated, (req, res) => {
    const user = users.find(u => u.username === req.session.userid);
    res.json({username: user.username});
})

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({message: "logout failed"});
        }
        res.json({message: "logout successful"});        
    })
})


module.exports = router;
