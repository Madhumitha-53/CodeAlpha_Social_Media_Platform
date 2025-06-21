const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/socialmedia', { useNewUrlParser: true });

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

const Post = mongoose.model('Post', {
  userId: String,
  content: String,
  timestamp: Date
});

app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: 'User registered' });
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(5001, () => console.log('Social Media Server started on port 5001'));
