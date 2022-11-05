import express, { json } from "express";

const app = express();

app.use(express.json());

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
  users.push(req.body);

  console.log(users);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  tweets.push(req.body);

  console.log(tweets);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const feedList = tweets.map((tweet) => {
    const userInfo = users.find((user) => user.username === tweet.username);
    tweet.avatar = userInfo.avatar
    return (tweet);
  });
  console.log(feedList);

  res.send(feedList.slice(-10))
});

app.listen(5000, () => console.log("Server running at port 5000"));
