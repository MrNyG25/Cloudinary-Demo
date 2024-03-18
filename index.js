require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const port = 8080;

const { storage, getImage } = require('./storage/storage');
const multer = require('multer');
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('', (req, res) => {
  res.render("home");
});

// code goes here
 app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('Done');
});

app.get('/img', upload.single('image'), (req, res) => {
  getImage()
  res.send('Done');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});