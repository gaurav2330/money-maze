const express = require('express');
const app = express();
const cors = require('cors');
const authenticator = require('./middlewares/authentication');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authenticator.authenticate);

const router = require('./routes/router');
app.use('/', router);


app.listen(3939, () => {
  console.log('Server is running on port 3939');
})