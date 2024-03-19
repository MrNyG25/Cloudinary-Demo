require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const port = 8080;
const cloudinary = require('cloudinary').v2;


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

app.post("/images", upload.array("pictures", 10), async (req, res) => {
  try {
    let pictureFiles = req.files;
    //Check if files exist
    if (!pictureFiles)
      return res.status(400).json({ message: "No picture attached!" });
    //map through images and create a promise array using cloudinary upload function
    let multiplePicturePromise = pictureFiles.map((picture) =>
      cloudinary.uploader.upload(picture.path)
    );
    // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    let imageResponses = await Promise.all(multiplePicturePromise);
    res.status(200).json({ images: imageResponses });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get('/img', upload.single('image'), (req, res) => {
  getImage()
  res.send('Done');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});