const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const s24studentsSchema = new mongoose.Schema({
  "myName": { type: String, required: true },
  "mySID": { type: String, required: true, unique: true }
});

// Create a Model object
const s24student = mongoose.model("s24student", s24studentsSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const myuri = req.body.myuri;
  // connect to the database and log the connection
  mongoose.connect(myuri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log(`Connected to MongoDB: ${myuri}`);
          const myName = "Wilson Chu";
          const mySID = "300379011";

          const newS24Student = new s24student({ myName, mySID });

          newS24Student.save()
              .then((data) => console.log(`Student added: ${data.myName} ${data.mySID}`)) // add the data to the database
              .then(()=> res.send(`<h1>Document  Added</h1>`)) // send a response to the user
              .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
      });
});



    
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
