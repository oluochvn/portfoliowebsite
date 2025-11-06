import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Contact } from './schema/contact.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.atlas_url)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// 🧩 Useful paths for serverless
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/test', (req, res) => {
  res.send('working');
});

app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.send("Your message has been received, we'll get in contact soon");
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default app;
