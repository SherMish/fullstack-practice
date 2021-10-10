const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

const usersRoute  = require('./routes/user');

app = express();
app.use(express.json());
app.use(cors());

const connection = mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

app.use('/api/users', usersRoute);



app.listen(3100, () => {
    console.log("listening on port 3100")
});