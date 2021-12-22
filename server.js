const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(bodyParser.json());

//DB Config
const dbKey = require('./config/keys').mongoURI;

//Connect to mongo 
mongoose.connect(dbKey).then(()=> console.log('DB connected')).catch(err=>console.log(err));


//Route Config
const items = require('./routes/api/items');
app.use('/api/items',items);

const port = process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server connected at port ${port}`);
})