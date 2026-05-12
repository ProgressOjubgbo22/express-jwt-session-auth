const express = require('express')
const app = express();
const PORT = 3000;
const session = require("express-session")

const sessionRouter = require("./session/session")
const tokenRouter = require("./token/token")

app.use(express.json())



app.use(session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}))
app.get("/", (req, res) => {
    res.send("hello world")
})
console.log("hello");

app.use("/", tokenRouter);
app.use("/", sessionRouter);

app.listen(PORT, () => {
    console.log("running http://localhost:3000");
})
