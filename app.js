// Imports
import bcrypt from 'bcrypt'
import express, { response } from 'express'

const app = express()
const port = 8081
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const theSalt = bcrypt.genSaltSync(10);
const users = [];

// Signup
app.post('/signup', async (request, response) => {
    const { username, password } = request.body
    const hashed = await bcrypt.hash(password, 12)

    // add to users array
    users.push({
        username,
        password: hashed
    });
    //response.send({username, password})
    console.log(users);
    response.send("Success!");
})


// For Login
app.post('/login', async (request, response) => {
    const { username, password } = request.body
    const user = users.find(u => u.username === username);

    if(!user) {
        response.send("Wrong username!");
        return
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        response.send("Wrong password!")
        return
    }

    // If login succeeds, show this!
    response.send(`Welcome ${username}!`)
    console.log(`Status: ${isValid}`);
})

app.listen(port, () => {
    console.log("Listening on port "+port);
})