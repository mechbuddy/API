const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./src/Login');
const serviceRoute = require('./src/ServiceProvider');
app.use(cors());
app.use(express.json())


const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use("/", userRoute);
app.use("/service", serviceRoute);

app.get("/", (req, res) => {
  res.send("It's on");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});