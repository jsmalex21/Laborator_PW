require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Permite comunicarea cu React

// Conectare MongoDB dacă există MONGO_URI, altfel avertisment
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectat la MongoDB Atlas!'))
    .catch(err => console.error('Eroare conectare MongoDB:', err));
}

// Ruta de bază (Lab 8 Ex 1)
app.get('/', (req, res) => {
  res.json({ message: 'Serverul functioneaza!' });
});

// GET - Toate proiectele (Lab 8 Ex 2)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Un singur proiect după ID (Lab 8 Ex 3)
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
});

// GET - Statistici (Lab 8 Ex 3)
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Project.countDocuments();
    const done = await Project.countDocuments({ done: true });
    res.json({ total, done, inProgress: total - done });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Adăugare proiect nou (Lab 8 Ex 4)
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done || false
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Actualizare proiect existent (Lab 8 Ex 6)
app.put('/api/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Ștergere proiect după ID (Lab 8 Ex 5)
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(PORT, () => console.log('Server pornit pe portul ' + PORT));