var express=require('express');
var moment=require('moment');
var bodyParser = require('body-parser');
const { Pool,Client} =require('pg')
var path=require('path')
/*  end      */



/* Configuration to connect to database */


const connectionString =(process.env.pg_URI ||"postgres://st:shyam02@localhost:5432")

const client = new Client({
    connectionString:connectionString
})

client.connect()
/*  end      */



//creating express object
app=express();



//seting view engine to ejs
app.set('view engine','ejs');


// using bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

//file handeling


   app.get('/dutyon',function(req,res){
    res.render("dutyon");
   });
   app.get('/dutyof',function(req,res){
    res.render("dutyof");
   });
   app.post('/dutyon',function(req,res){
    
 client.query("INSERT INTO dutyonn(name,date,time,password)values($1,$2,$3,$4);",[req.body.name,req.body.date,req.body.time,req.body.password],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("dutyon");}
});

});
app.post('/dutyof',function(req,res){
    
    client.query("INSERT INTO dutyoff(name,date,time,password)values($1,$2,$3,$4);",[req.body.name,req.body.date,req.body.time,req.body.password],function(err,result)
     {
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else{res.render("dutyof");}
   });
   
   });
   app.get('/home', function(req, res) {
    client.query("SELECT * FROM dutyonn",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('home',{dutyonn:result.rows});
    });
  });
  app.get('/home1', function(req, res) {
    client.query("SELECT * FROM dutyoff",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('home1',{dutyoff:result.rows});
    });
  });
 
//port
app.listen(7000); //our app is running on port no 8080
console.log('Server started at port 7000');
