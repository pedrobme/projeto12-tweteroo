import express, { json } from 'express'

const app = express()

app.use(express.json())

const users = []

const tweets = []

app.post('/sign-up', (req,res) => {

    users.push(req.body)

    console.log(users)
    res.send('OK')
})

app.post('/tweets', (req,res) => {

    tweets.push(req.body)

    console.log(tweets)
    res.send('OK')
})

app.listen(5000, ()=>console.log('Server running at port 5000'))