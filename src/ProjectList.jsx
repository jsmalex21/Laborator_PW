import { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(r => r.json())
      .then(data => setProjects(data));
  }, []);

  // Adăugare (POST)
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('https://laborator-pw-d90l.onrender.com/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, tech, done: false })
    });
    const newProject = await response.json();
    setProjects([...projects, newProject]);
    setTitle(''); setTech('');
  }

  // Ștergere (DELETE) cu confirmare [cite: 626-629]
  async function handleDelete(id) {
    if (window.confirm('Sigur dorești să ștergi acest proiect?')) {
      await fetch('https://laborator-pw-d90l.onrender.com/api/projects' + id, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    }
  }

  // Toggle (PUT) [cite: 608-611]
  async function handleToggle(id, currentDone) {
    const response = await fetch('https://laborator-pw-d90l.onrender.com/api/projects' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !currentDone })
    });
    const updated = await response.json();
    setProjects(projects.map(p => p._id === id ? updated : p));
  }

  return (
    <div>
      <h3>Adaugă Proiect</h3>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titlu" required />
        <input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Tehnologii" required />
        <button type="submit">Adaugă</button>
      </form>

      <hr />
      
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cauta..." />

      {projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map(p => (
        <div key={p._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
          <h3>{p.title} {p.done ? '✅' : '⏳'}</h3>
          <p>{p.tech}</p>
          <button onClick={() => handleToggle(p._id, p.done)}>
            {p.done ? "Redeschide" : "Finalizat"}
          </button>
          <button onClick={() => handleDelete(p._id)} style={{ marginLeft: '10px' }}>Șterge</button>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;