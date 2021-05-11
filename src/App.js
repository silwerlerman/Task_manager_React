import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    fetch("http://185.246.66.84:3000/llerman/tasks")
    .then(res => res.json())
    .then(
      (result) => {
        setTasks(result);
      },
      (error) => {
        setError(error);
      }
    )
  })

  return (
    <div className="App">
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;