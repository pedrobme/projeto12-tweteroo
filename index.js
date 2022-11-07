import express from "express";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

const users = [],
  tweets = [],
  tweetsFeed = [];

const isValid = (obj) => {
  for (let key of Object.keys(obj)) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
};

app.post("/sign-up", (req, res) => {
  if (!isValid(req.body)) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push(req.body);

  console.log(users);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  if (!isValid(req.body)) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const { user } = req.headers;

  tweets.push({ ...req.body, username: user });

  const userInfo = users.find(
    (userFromDatabase) => userFromDatabase.username === user
  );

  tweetsFeed.push({ ...req.body, avatar: userInfo.avatar, username: user });

  console.log(tweets);
  console.log(tweetsFeed);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  if (req.query.page < 1) {
    res.status(400).send("Informe uma pagina valida");
  }

  let page = Number(req.query.page);

  if (!req.query.page) {
    page = 1;
  }

  const lowerLimit = page * -10;
  let higherLimit = lowerLimit + 10;

  if (higherLimit >= 0) {
    higherLimit = undefined;
  }

  res.send(tweetsFeed.slice(lowerLimit, higherLimit).reverse());
});

app.get("/tweets/:username", (req, res) => {
  const feedByUsername = tweetsFeed.filter(
    (tweet) => tweet.username === req.params.username
  );

  res.send(feedByUsername);
});

app.listen(5000, () => console.log("Server running at port 5000"));
