const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const userAPI=require('./src/api/UserAPI');
const messageAPI=require('./src/api/messageApi');
const fileAPI=require('./src/api/fileApi');
const fs = require('fs')
const https = require('https')
const path = require('path')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}))

const options = {
  cert: fs.readFileSync(path.join(__dirname,'src','ssl','cert.pem')),
  key: fs.readFileSync(path.join(__dirname,'src','ssl','key.pem'))
};

app.use(bodyParser.json({ limit:"120mb",extended: true}));
app.use(bodyParser.urlencoded({ limit:"120mb",extended: true}));
app.set('trust proxy', 1) // trust first proxy

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true

}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

app.use('/users', userAPI());
app.use('/messages', messageAPI());
app.use('/file_upload', fileAPI());

mongoose.connection.once('open', () => {
  console.log('Database Connected');
});

https.createServer(options,app)
    .listen(PORT,function(){
        console.log(`Serving the ${path.join(__dirname,'ssl','server.crt')}`)
    })