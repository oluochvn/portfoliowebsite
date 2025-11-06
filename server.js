import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { Contact } from './schema/contact.js';
import cors from 'cors';
import dotenv from 'dotenv';
import {body,validationResult} from 'express-validator'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.atlas_url)

    .then(()=> console.log('connected to the database'))
    .catch((err)=>console.log(err))
app.get('/test',(req,res)=>{
    res.send('working')
})
app.post('/submit',async (req,res)=>{
    try{
        const {name,email,message} = req.body;
        const newContact =  new Contact({
            name, email ,message,
        })
   await newContact.save();
    res.send("your message has been received, we'll get in contact soon")
    }
    catch(err){
        console.log(err)
    }

})
app.listen(3000, ()=> console.log('running on port 3000'))