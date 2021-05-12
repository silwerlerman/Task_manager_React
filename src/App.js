import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './Components/TaskForm';

function App() {

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://185.246.66.84:3000/llerman/tasks")
    .then(res => setTasks(res.data))
    .catch(err => setError(err))
  },[])

  return (
    <>
      <TaskForm tasksArr={tasks} showCompletedTasks={true}/>
      <TaskForm tasksArr={tasks} showCompletedTasks={false}/>
    </>
  );
}

export default App;