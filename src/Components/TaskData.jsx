import axios from 'axios'
import { useState, useEffect, memo, useCallback } from 'react';
import TaskForm from './TaskForm';

const TaskData = memo(() => {

    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
        axios.get("http://185.246.66.84:3000/llerman/tasks")
        .then(res => setTasks(res.data))
        .catch(err => setError(err))
    },[])
    
    const addTask = useCallback((req) => {
        const newTask = {
            completed: false,
            title: "Task " + (req + 1),
            sequence: req + 1
        }
        axios.post("http://185.246.66.84:3000/llerman/tasks", newTask)
        .then(response => {
            console.log(response.data)
            setTasks(prev =>
                [
                    ...prev,
                    newTask
                ]
            );
        })
        .catch(error => console.log(error));
    },[setTasks]) 

    const removeTask = useCallback((id) => {
        axios.delete("http://185.246.66.84:3000/llerman/tasks/" + id)
        .then(response => {
            console.log(response.data)
            if(!id) return;
            setTasks(prev =>
                prev.filter(curr => curr.id !== id)
            );
        })
        .catch(error => console.log(error));
    },[setTasks])
    
    const checkTask = useCallback((task) => {
        axios.put("http://185.246.66.84:3000/llerman/tasks/" + task.id, {
            completed: !task.completed,
            title: task.title,
            sequence: task.sequence           
        })
        .then(response => {
            console.log(response.data)
            if(!task.id) return;
            setTasks(prev =>
                prev.filter(curr => curr.id !== task.id)
            );
        })
        .catch(error => console.log(error));
    },[setTasks])    

    return (
        <>
            <TaskForm tasksArr={tasks} showCompletedTasks={true} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask}/>
            <TaskForm tasksArr={tasks} showCompletedTasks={false} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask}/>
        </>
      );
})

export default TaskData;