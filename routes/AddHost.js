const express = require('express');
const router = express.Router();
const multer = require('multer');
const userPresent = require("../middelware/check_use")
const { MongoClient } = require('mongodb');
const upload = multer({ dest: 'uploads/' });

router.get('/', userPresent, (req, res) => {
  const userName = req.cookies.userInfo;
  res.render('AddHost',{userName});
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://adityatupe25at:newhaibhai@adityacode.dbctto5.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db('sample_airbnb');
      const collection = db.collection('host');
      const userName = req.cookies.userInfo;
      
      const result = await collection.insertMany([{ userName: userName.name, userEmail: userName.email, picture: req.file.filename,Date:new Date()}]);
      console.log("reqfile***", userName.name)
    res.render("Host_succesful");
   
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;