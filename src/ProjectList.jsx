import { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State-uri pentru formularul de adăugare
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  // 1. Incarcarea initiala a datelor
  useEffect(function() {
    fetch('http://localhost:3000/api/projects')
      .then(r => r.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  // 2. Functia de stergere (DELETE)
  async function handleDelete(id) {
    try {
      await fetch('http://localhost:3000/api/projects/' + id, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error('Eroare la stergere:', err);
    }
  }

  // 3. Functia de adaugare (POST)
  async function handleSubmit(e) {
    e.preventDefault(); // Oprește reîncărcarea paginii
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tech }) // trimite datele către server
      });
      const newProject = await response.json();
      setProjects([...projects, newProject]); // Adaugă noul proiect în listă
      setTitle(''); // Golește input-urile
      setTech('');
    } catch (err) {
      console.error('Eroare la adaugare:', err);
    }
  }

  if (loading) return <p>Se incarca...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Adauga Proiect Nou</h3>
      <form onSubmit={handleSubmit}>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Titlu" 
          required 
        />
        <input 
          value={tech} 
          onChange={(e) => setTech(e.target.value)} 
          placeholder="Tehnologii" 
          required 
        />
        <button type="submit">Adauga</button>
      </form>

      <hr />

      <h3>Lista Proiecte</h3>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cauta un proiect..."
      />

      <div style={{ marginTop: '10px' }}>
        {projects
          .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
          .map(project => (
            <div key={project._id} style={{ borderBottom: '1px solid gray', padding: '10px' }}>
              <h3>{project.title}</h3>
              <p>{project.tech}</p>
              <button onClick={() => handleDelete(project._id)}>Sterge</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectList;