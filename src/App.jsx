import { useState } from 'react';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';

function App() {
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
      <ProjectList />
    </div>
  );
}

export default App;