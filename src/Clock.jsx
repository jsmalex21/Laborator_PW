import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      <h3>Ceas Live (useEffect)</h3>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        Ora curentă: {time.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default Clock;
