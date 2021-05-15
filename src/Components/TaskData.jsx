import axios from 'axios'
import { useState, useEffect, useCallback } from 'react';
import TaskContext from '../TaskContext';
import SubTaskContext from '../SubTaskContext';
import TaskForm from './TaskForm';

function TaskData(){

    const [tasks, setTasks] = useState([]);
    const [subTasks, setSubTasks] = useState([]);

    useEffect(()=>{
        axios.get("http://185.246.66.84:3000/llerman/tasks")
        .then(response => {
            setTasks(response.data)
        })
        .catch(error => console.log(error))

        axios.get("http://185.246.66.84:3000/llerman/subtasks")
        .then(response => {
            setSubTasks(response.data)
        })
        .catch(error => console.log(error))
    },[])

    const addTask = useCallback((req) => {
        const newTask = {
            completed: false,
            title: "Task " + (req + 1),
            sequence: req + 1
        }
        axios.post("http://185.246.66.84:3000/llerman/tasks", newTask)
        .then(response => {
            setTasks(prev =>
                [
                    ...prev,
                    response.data
                ]
            );
        })
        .catch(error => console.log(error));
    },[setTasks]) 

    const addSubTask = useCallback((id) => {

        function calculateSubTaskSequence(){
            var remSubTasks = subTasks.filter(subTask => subTask.taskId === id);
            return remSubTasks === undefined ? 1 : remSubTasks.length + 1;
        }

        const newSubTask = {
            completed: false,
            sequence: calculateSubTaskSequence(),
            taskId: id,
            title: "Subtask for Task" + id
        }
        axios.post("http://185.246.66.84:3000/llerman/subtasks", newSubTask)
        .then(response => {
            setSubTasks(prev =>
                [
                    ...prev,
                    response.data
                ]
            );
        })
        .catch(error => console.log(error));
    },[setSubTasks])

    const removeTask = useCallback((id) => {
        axios.delete("http://185.246.66.84:3000/llerman/tasks/" + id)
        .then(response => {
            if(!id) return;
            setTasks(prev =>
                prev.filter(curr => curr.id !== id)
            );
        })
        .catch(error => console.log(error));
    },[setTasks])
    
    const removeSubTask = useCallback((id) => {
        axios.delete("http://185.246.66.84:3000/llerman/subtasks/" + id)
        .then(response => {
            if(!id) return;
            setSubTasks(prev =>
                prev.filter(curr => curr.id !== id)
            );
        })
        .catch(error => console.log(error));
    },[setSubTasks])    

    const checkTask = useCallback((task) => {
        axios.put("http://185.246.66.84:3000/llerman/tasks/" + task.id, {
            completed: !task.completed,
            title: task.title,
            sequence: task.sequence           
        })
        .then(response => {
            setTasks(prev =>{
                return [
                    ...prev.filter(curr => curr.id !== task.id),
                    response.data
                ]
            });
        })
        .catch(error => console.log(error));
    },[setTasks])
    
    const renameTask = useCallback((task, newTitle) => {
        if (task.title !== newTitle){
            axios.put("http://185.246.66.84:3000/llerman/tasks/" + task.id, {
                completed: task.completed,
                title: newTitle,
                sequence: task.sequence           
            })
            .then(response => {
                setTasks(prev =>{
                    return [
                        ...prev.filter(curr => curr.id !== task.id),
                        response.data
                    ]
                });
            })
            .catch(error => console.log(error));
        }
        
    },[setTasks])    

    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            <SubTaskContext.Provider value={[subTasks, setSubTasks]}>
                <TaskForm showCompletedTasks={false} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask} onTitleChange={renameTask} addSubTask={addSubTask} removeSubTask={removeSubTask}/>
                <TaskForm showCompletedTasks={true} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask}/>
            </SubTaskContext.Provider>
        </TaskContext.Provider>
      );
}

export default TaskData;