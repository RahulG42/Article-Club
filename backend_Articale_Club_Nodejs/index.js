const express=require('express');
var cors=require('cors');

const app=express();
const connection=require('./connection');
const appuserRoutes=require('./routes/appuser');
const categoryRoute=require('./routes/category');
const articleRoute=require('./routes/article');

const corsOptions = {
    origin: 'http://your-angular-app-domain.com', // Replace with your Angular app's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  
app.use(cors());
app.use(express.json());
app.use('/appuser',appuserRoutes);
app.use('/category',categoryRoute);
app.use('/article',articleRoute);
module.exports=app;

