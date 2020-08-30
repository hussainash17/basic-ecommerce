const e = require('express');
const express = require('express');
const mongoose = require('mongoose');

// allow us to use env variables
require('dotenv').config();

const userRoutes = require('./routes/user');

// app
const app = express();

//database connection
mongo_uri = process.env.DATABASE;
mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected succesfully');
  })
  .catch((err) => console.log(err));

// routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
