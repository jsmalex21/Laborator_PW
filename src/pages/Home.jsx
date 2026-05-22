import { useState, useEffect } from 'react';

function Home() {
  const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(r => r.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div>
      <h2>Dashboard Statistici</h2>
      <p>Total proiecte: {stats.total}</p>
      <p>Finalizate: {stats.done}</p>
      <p>În lucru: {stats.inProgress}</p>
    </div>
  );
}

export default Home;