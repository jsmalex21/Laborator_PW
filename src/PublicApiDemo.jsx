import { useState, useEffect } from 'react';

function PublicApiDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare la conectarea la API extern');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Eroare la încărcarea datelor public API');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se încarcă datele din API extern (JSONPlaceholder)...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Eroare: {error}</p>;
  }

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      <h3>API Public Demo (JSONPlaceholder Users)</h3>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Caută utilizator..."
        style={{ marginBottom: '10px', padding: '6px', width: '100%', maxWidth: '300px' }}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) — <em>{user.company?.name}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicApiDemo;
