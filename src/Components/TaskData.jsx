import axios from 'axios'
import { useState, useEffect, useCallback } from 'react';
import AppContext from '../AppContext';
import TaskForm from './TaskForm';

function TaskData(){

    const [tasks, setTasks] = useState([]);

    function getData(){
        
        axios.get("http://185.246.66.84:3000/llerman/tasks")
        .then(response => {
            console.log(response.data)
            setTasks(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        getData();
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
                    response.data
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
            console.log(response.data);
            setTasks(prev =>{
                return [
                    ...prev.filter(curr => curr.id !== task.id),
                    response.data
                ]
            });
        })
        .catch(error => console.log(error));
    },[setTasks])    

    return (
        <AppContext.Provider value={[tasks, setTasks]}>
            <TaskForm showCompletedTasks={false} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask}/>
            <TaskForm showCompletedTasks={true} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask}/>
        </AppContext.Provider>
      );
}

export default TaskData;