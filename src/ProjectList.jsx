import { useState, useEffect } from 'react';

// Se folosește serverul local sau de pe Render
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api/projects'
  : 'https://laborator-pw-d90i.onrender.com/api/projects';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  useEffect(() => {
    fetch(API_BASE)
      .then(response => {
        if (!response.ok) {
          throw new Error('Eroare la încărcarea datelor');
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        // Dacă eșuează URL-ul principal, încercăm fallback pe celălalt URL
        const fallbackUrl = API_BASE.includes('localhost')
          ? 'https://laborator-pw-d90i.onrender.com/api/projects'
          : 'http://localhost:3000/api/projects';

        fetch(fallbackUrl)
          .then(res => res.json())
          .then(data => {
            setProjects(data);
            setLoading(false);
          })
          .catch(() => {
            setError(err.message || 'Eroare la încărcarea datelor');
            setLoading(false);
          });
      });
  }, []);

  // Adăugare (POST)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tech, done: false })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Eroare la adăugare');
      }
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setTitle('');
      setTech('');
    } catch (err) {
      alert('Eroare la adăugarea proiectului: ' + err.message);
    }
  }

  // Ștergere (DELETE) cu confirmare
  async function handleDelete(id) {
    if (window.confirm('Sigur dorești să ștergi acest proiect?')) {
      try {
        const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Eroare la ștergere');
        }
        setProjects(projects.filter(p => (p._id || p.id) !== id));
      } catch (err) {
        alert('Eroare la ștergere: ' + err.message);
      }
    }
  }

  // Toggle (PUT)
  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Eroare la actualizare');
      }
      const updated = await response.json();
      setProjects(projects.map(p => ((p._id || p.id) === id ? updated : p)));
    } catch (err) {
      alert('Eroare la actualizare: ' + err.message);
    }
  }

  if (loading) {
    return <p>Se încarcă proiectele...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Mesaj eroare: {error}</p>;
  }

  const totalCount = projects.length;
  const doneCount = projects.filter(p => p.done).length;
  const inProgressCount = projects.filter(p => !p.done).length;

  return (
    <div>
      <h3>Adaugă Proiect</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titlu"
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="Tehnologii"
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit">Adaugă</button>
      </form>

      <hr />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Caută proiect după titlu..."
        style={{ margin: '10px 0', padding: '6px', width: '100%', maxWidth: '300px' }}
      />

      {projects
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .map(p => {
          const id = p._id || p.id;
          return (
            <div key={id} style={{ border: '1px solid gray', borderRadius: '6px', padding: '10px', margin: '10px 0' }}>
              <h3>{p.title} {p.done ? '✅' : '⏳'}</h3>
              <p>{p.tech}</p>
              <button onClick={() => handleToggle(id, p.done)}>
                {p.done ? "Redeschide" : "Finalizat"}
              </button>
              <button onClick={() => handleDelete(id)} style={{ marginLeft: '10px' }}>Șterge</button>
            </div>
          );
        })}

      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '6px', color: '#333' }}>
        <h4>Statistici din date</h4>
        <p>Total proiecte: <strong>{totalCount}</strong></p>
        <p>Finalizate: <strong>{doneCount}</strong></p>
        <p>În lucru: <strong>{inProgressCount}</strong></p>
      </div>
    </div>
  );
}

export default ProjectList;