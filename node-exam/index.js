const express = require('express');
const bodyParser = require('body-parser');
const Booktest = require('./test_api/book_api');
const UsersTest = require('./test_api/user_api');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/book/test',Booktest);
app.use('/user/test',UsersTest);
app.listen(4001, () => {
    console.log(`Server running on port  `,4001);
  });

