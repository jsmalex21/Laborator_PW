const express = require('express');
const app = express();
const PORT = 3000;

// Ex 4: Permite citirea datelor tip JSON (pentru functia de POST)
app.use(express.json());

// Ex 2: Datele noastre (array de proiecte)
const projects = [
  { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
  { id: 2, title: "Calculator Buget", tech: "HTML, CSS, JS", done: true },
  { id: 3, title: "Dashboard React", tech: "React", done: false },
  { id: 4, title: "API Meteo", tech: "React, API", done: false }
];

// Ex 1: Prima ruta (raspunde la GET /)
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

// Ex 2: Returneaza toate proiectele
app.get('/api/projects', function (req, res) {
  res.json(projects);
});

// Ex 3: Returneaza un singur proiect dupa id
app.get('/api/projects/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(project);
});

// Ex 3: Returneaza statistici
app.get('/api/stats', function(req, res) {
  const total = projects.length;
  const finalizate = projects.filter(p => p.done).length;
  const inLucru = projects.filter(p => !p.done).length;
  
  res.json({ total: total, finalizate: finalizate, inLucru: inLucru });
});

// Ex 4: POST - adaugare proiect nou
app.post('/api/projects', function(req, res) {
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    tech: req.body.tech,
    done: req.body.done || false
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Ex 5: DELETE - stergere proiect dupa id
app.delete('/api/projects/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }
  projects.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});