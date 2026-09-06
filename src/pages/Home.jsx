import { useState, useEffect } from 'react';
import Counter from '../Counter';
import QuickNote from '../QuickNote';
import TodoList from '../TodoList';
import Clock from '../Clock';
import PublicApiDemo from '../PublicApiDemo';

function Home() {
  const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });

  useEffect(() => {
    const statsUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/stats'
      : 'https://laborator-pw-d90i.onrender.com/api/stats';

    fetch(statsUrl)
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {
        // Fallback dacă endpoint-ul nu e accesibil
        fetch('http://localhost:3000/api/stats')
          .then(r => r.json())
          .then(data => setStats(data))
          .catch(err => console.log('Stats fetch error:', err));
      });
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10px' }}>
      <h2>Dashboard Statistici Proiecte</h2>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ flex: 1, padding: '10px', background: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>
          <h4>Total proiecte</h4>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{stats.total}</p>
        </div>
        <div style={{ flex: 1, padding: '10px', background: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}>
          <h4>Finalizate</h4>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{stats.done}</p>
        </div>
        <div style={{ flex: 1, padding: '10px', background: '#fff3e0', borderRadius: '8px', textAlign: 'center' }}>
          <h4>În lucru</h4>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{stats.inProgress}</p>
        </div>
      </div>

      <hr />

      <h2>Laboratoare & Componente Interactive</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <Clock />
        <Counter />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <QuickNote />
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <TodoList />
        </div>
      </div>

      <div style={{ marginTop: '15px' }}>
        <PublicApiDemo />
      </div>
    </div>
  );
}

export default Home;