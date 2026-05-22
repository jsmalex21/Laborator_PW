require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Project = require('./models/Project');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Permite comunicarea cu React [cite: 580-582]

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectat la MongoDB Atlas!'))
  .catch(err => console.error('Eroare conectare:', err));

// GET - Toate proiectele
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// POST - Adăugare
app.post('/api/projects', async (req, res) => {
  const newProject = new Project(req.body);
  const saved = await newProject.save();
  res.status(201).json(saved);
});

// PUT - Actualizare (pentru bifat/debifat) [cite: 594-603]
app.put('/api/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Ștergere
app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// GET - Statistici [cite: 636-643]
app.get('/api/stats', async (req, res) => {
  const total = await Project.countDocuments();
  const done = await Project.countDocuments({ done: true });
  res.json({ total, done, inProgress: total - done });
});

app.listen(PORT, () => console.log('Server pornit pe http://localhost:3000'));