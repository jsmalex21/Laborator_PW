import { useState } from 'react';
import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';

function App() {
  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" }
  ];

  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Numele vostru: Taranu Alexandru</p>

      <div>
        <p>Ai apasat de {count} ori</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <hr />

      <QuickNote />
      <hr />
      <TodoList />
      <hr />
      <ContactForm />
      <hr />

      <div>
        {projects.map(function(item, index) {
          return <Card key={index} title={item.title} description={item.description} />;
        })}
      </div>
    </div>
  );
}

export default App;