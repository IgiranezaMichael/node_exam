const express=require('express');
const connection = require('../config/dbconnection');
const UsersTest=express();

UsersTest.post('/adduser',async (req, res) => {
    const names=req.body.names;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    // validate user input
    if(names==undefined|| email==undefined|| username==undefined||password==undefined)
    {res.json('All Information are required');}
    else{const data={names:names,email:email,username:username,password:password};
    const sql="insert into users set?";
    connection.query(sql,data, (err, results) => {
      if (err) throw err;
      res.json("User Added Succesfully");
    });
}

  });
  UsersTest.post('/userlogin',async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
const sql="select * from users where username=? and password=?";
connection.query(sql,[username,password],(err,result)=>{
    if (err) throw err;
      res.json(result);
});     
  });
  
  UsersTest.get('/findbookauthor',async (req, res) => {
    const author=req.body.author;
    const findBookauthor='select * from books where author=?';
    connection.query(findBookauthor, [author],(err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  UsersTest.get('/findbookbytitle',async (req, res) => {
    const title=req.body.title;
    const findbookbytitle='select * from books where Title=?';
    connection.query(findbookbytitle, [title],(err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
module.exports=UsersTest;
  