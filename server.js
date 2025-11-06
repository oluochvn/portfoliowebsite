import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Contact } from './schema/contact.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.atlas_url)
  .then(() => console.log('connected to the database'))
  .catch((err) => console.log(err));

app.get('/test', (req, res) => {
  res.send('working');
});

// 👉 Add this route at the bottom
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
