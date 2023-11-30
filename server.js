require("dotenv").config();
const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const expressLayout=require("express-ejs-layouts");
const PORT=process.env.PORT || 3000;
const mongoose=require("mongoose");
const session=require("express-session");
const flash=require("express-flash");
const MongoDbStore=require("connect-mongo");
const passport=require('passport')

//Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/PizzaApp").then((data)=>{
    console.log("Database connected");
})


//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/PizzaApp'
      }),
    cookie:{maxAge:1000*60*60*24}
}))

//passport config
const passportInit=require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());

//Assests
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})
//set template engine
app.use(expressLayout);
app.set("views",path.join(__dirname,"/resources/views"));
app.set("view engine","ejs");


require("./routes/web")(app)




app.listen(PORT,(err)=>{
    if(err){
        console.log("Err");
    }else{
        console.log(`Server Started on ${PORT}`);
    }
})