import './App.css';
import TasksData from './Components/TasksData';


function App() {
  return (
    <TasksData reqAddr="http://185.246.66.84:3000/llerman/tasks"/>
  );
}

export default App;