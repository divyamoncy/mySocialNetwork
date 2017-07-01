const express = require('express')
const app = express()
app.use(express.static('static'));
var reso;

var Datastore=require('nedb');
var db= new Datastore({filename:'gn.db',autoload:true});

app.set('port',process.env.PORT||5000)

app.set('view engine','ejs');

	
	

	

app.get('/',function(req,res){
	res.render('index');
	
})


app.get('/login',function(req,res){
	res.render('log');
	
})

app.get('/signup', function (req,res) {
  
  res.render('sign');

})
app.get('/signupSubmit',function(req,res){
	var name=req.query.nam;
	var emai=req.query.em;
	var pwda=req.query.pwd1;
	var pwdb=req.query.pwd2;

	
    var person = {
    	"username":name,
    	"email":emai,
    	"enter password":pwda,
    	"confirm password":pwdb
    };
     db.insert(person,function(err,result){
     	console.log(result);
     	res.send('YOU HAVE SUCCESSFULLY SIGNED UP!');
     })



})
app.get('/loginSubmit',function(req,res){

	var user=req.query.uname;
	var paw=req.query.pass;
	var person={
		"username":user,
		"enter password":paw
	}
	db.find(person,function(err,result){
		db.find({},function(err,resul){
	
		
		if(result.length>0)
			res.render('letta',{re:resul});

			
		else
			res.send('No Such User');
	   })
    })
})
app.get('/loginSubmit/:pro',function(req,res){
	var pro=req.params.pro;
	db.find({username:pro},function(err,result){
	
    if(result.length!=0)
    
    		res.render('indiv',{res:result});
    
    else
    	res.send("No Such User");


})

})
app.listen(app.get('port'),function(){
	console.log('app is listening');
})