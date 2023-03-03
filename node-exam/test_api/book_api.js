const express=require('express');
const connection = require('../config/dbconnection');
const Booktest=express();
const mutter=require('multer');
const bodyParser = require('body-parser');
const upload=mutter({storage:mutter.memoryStorage()});

Booktest.get('/getallbooks',async (req, res) => {
    const sql = 'SELECT * FROM books';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  Booktest.get('/findbookbyisnb',async (req, res) => {
    const isnb=req.body.isbn;
    console.log(isnb);
    const findisnb='select * from books where serialnumber=?';
    connection.query(findisnb, [isnb],(err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
//   Question 8
Booktest.use(bodyParser.urlencoded({extended:false}));
Booktest.post('/addbookreview',async (req,res)=>{
const userid=req.body.email;
const serialnumber=req.body.serialnumber;
const comment=req.body.comment;
const review=req.body.review;
const sql="insert into reviewandcomment (userId,serialnumber,comment,review) values(?,?,?,?)"
connection.query(sql,[userid,serialnumber,comment,review],(err,result)=>{
if(err) throw err
    res.json(result);
});
});
// Question 9
Booktest.post('/deletebookreviewofaparticularuser',async (req,res)=>{
const serialnumber=req.body.serialnumber;
const userid=req.body.email;
const sql="delete from reviewandcomment where serialnumber=? and userId=?";
connection.query(sql,[serialnumber,userid],(err,result)=>{
if(err) throw err
    res.json(result);
});
});
  // Question 10
  Booktest.get('/findbookauthor',async (req, res) => {
    const author=req.body.author;
    const findBookauthor='select * from books where author=?';
    connection.query(findBookauthor, [author],(err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  Booktest.get('/findbookbytitle',async (req, res) => {
    const title=req.body.title;
    const findbookbytitle='select * from books where Title=?';
    connection.query(findbookbytitle, [title],(err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  Booktest.get('/getbookreview',async (req, res) => {
    const isnb=req.body.isnb;
    const sql="SELECT * FROM reviewandcomment,users WHERE  reviewandcomment.serialnumber=?"
    connection.query(sql,[isnb],(error,result)=>{
        res.json(result);
    });
 
  });
  // Question11  Search by ISBN – Using Promises
  Booktest.get('/promises/searbbyisbn',(req,res)=>{
    getBookbyisbn(req.body.isbn).then((book)=>{
      res.json(book);
    });
  });
function getBookbyisbn(isbn){
   const qry="select * from books where serialnumber=?";
    return new Promise((resolve,reject)=>{
  connection.query(qry,[isbn],(err,result)=>{
    if(err){reject(err);}
    else resolve(result);
  });
   }); 
  }
  // Question 12 Use Async/Await or Promises with Axios in Node.js
  Booktest.get('/async/await/searbookbyauthor',async (req,res)=>{
   const books=await getBookbyauthor(req.body.author);
   res.json(books);
  });
 async function getBookbyauthor(author){
    const qry="select * from books where author=?";
     return new Promise ((resolve,reject)=>{
   connection.query(qry,[author],(err,result)=>{
     if(err){reject(err);}
     else resolve(result);
   });
    }); 
   }
  // Question 13 Use Async/Await or Promises with Axios in Node.js
  Booktest.get('/async/await/searbookbytitle',async (req,res)=>{
    const books=await getBookbyTitle(req.body.title);
    res.json(books);
   });
  async function getBookbyTitle(author){
     const qry="select * from books where Title=?";
      return new Promise ((resolve,reject)=>{
    connection.query(qry,[author],(err,result)=>{
      if(err){reject(err);}
      else resolve(result);
    });
     }); 
    }
module.exports=Booktest;
  