import { useState, useEffect } from 'react';
import Card from './Card'; 

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [search, setSearch] = useState('');

  useEffect(function() {
    fetch('/data/projects.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function(err) {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca...</p>;
  }

  if (error !== null) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>

      {/* Input pentru filtrare */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cauta un proiect..."
      />

      {/* Filtrare si afisare lista */}
      <div style={{ marginTop: '10px' }}>
        {projects.filter(function(p) {
          return p.title.toLowerCase().includes(search.toLowerCase());
        }).map(function(item) {
          return <Card key={item.id} title={item.title} description={item.tech} />;
        })}
      </div>

      {/* Statistici */}
      <div style={{ marginTop: '20px', borderTop: '1px solid gray', paddingTop: '10px' }}>
        <p>Total proiecte: {projects.length}</p>
        <p>Finalizate: {projects.filter(p => p.done).length}</p>
        <p>In lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;