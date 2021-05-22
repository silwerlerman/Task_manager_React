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
            setTasks(response.data.sort((a,b) => a.sequence - b.sequence))
        })
        .catch(error => console.log(error))

        axios.get("http://185.246.66.84:3000/llerman/subtasks")
        .then(response => {
            setSubTasks(response.data)
        })
        .catch(error => console.log(error))
    },[])

    const addTask = useCallback(() => {
        
        function calculateTaskSequence(){
            var remTasks = tasks.filter(task => !task.completed);
            return remTasks === undefined ? 1 : remTasks.length + 1;
        }

        const newTask = {
            completed: false,
            title: tasks.length === 0 ? "Task 1" : "Task " + (tasks.length + 1),
            sequence: calculateTaskSequence()
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
    },[tasks, setTasks]) 

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
    },[subTasks, setSubTasks])
    
    const removeTask = useCallback((id) => {

        let tasksToChange = tasks.filter(task => task.sequence > tasks.filter(task => task.id === id)[0].sequence);
        
        if (tasksToChange) {
            tasksToChange.forEach(task => {
                task.sequence -= 1;
                axios.put("http://185.246.66.84:3000/llerman/tasks/" + task.id, {
                    ...task           
                })
            })
        }
        axios.delete("http://185.246.66.84:3000/llerman/tasks/" + id)
        .then(response => {
            setTasks(prev => prev.filter(curr => curr.id !== id));
            subTasks.filter(subTask => subTask.taskId === id)
                .forEach(subTask => removeSubTask(subTask.id));
        })
        .catch(error => console.log(error));
    },[tasks, subTasks, setTasks])

    const removeSubTask = useCallback((id) => {
        axios.delete("http://185.246.66.84:3000/llerman/subtasks/" + id)
        .then(response => {
            setSubTasks(prev =>
                prev.filter(curr => curr.id !== id)
            );
        })
        .catch(error => console.log(error));
    },[setSubTasks])    

    const checkTask = useCallback((task) => {

        function calculateTaskSequence(){
            let remTasks = task.completed ? tasks.filter(task => !task.completed) : tasks.filter(task => task.completed)
            debugger
            return remTasks === undefined ? 1 : ++remTasks.length;
        }

        axios.put("http://185.246.66.84:3000/llerman/tasks/" + task.id, {
            completed: !task.completed,
            title: task.title,
            sequence: calculateTaskSequence()           
        })
        .then(response => {
            setTasks(prev =>{
                return [
                    ...prev.filter(curr => curr.id !== task.id),
                    response.data
                ].sort((a,b) => a.sequence - b.sequence);
            });
        })
        .catch(error => console.log(error));
    },[tasks, setTasks])

    const checkSubTask = useCallback((task) => {
        axios.put("http://185.246.66.84:3000/llerman/subtasks/" + task.id, {
            completed: !task.completed,
            sequence: task.sequence,
            taskId: task.taskId,
            title: task.title,           
        })
        .then(response => {
            setSubTasks(prev =>{
                return [
                    ...prev.filter(curr => curr.id !== task.id),
                    response.data
                ]
            });
        })
        .catch(error => console.log(error));
    },[setSubTasks])
    
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
                    ].sort((a,b) => a.sequence - b.sequence);
                });
            })
            .catch(error => console.log(error));
        }
        
    },[setTasks])    

    const renameSubTask = useCallback((task, newTitle) => {
        if (task.title !== newTitle){
            axios.put("http://185.246.66.84:3000/llerman/subtasks/" + task.id, {
                completed: task.completed,
                sequence: task.sequence,
                taskId: task.taskId,
                title: newTitle,    
            })
            .then(response => {
                setSubTasks(prev =>{
                    return [
                        ...prev.filter(curr => curr.id !== task.id),
                        response.data
                    ]
                });
            })
            .catch(error => console.log(error));
        }
        
    },[setSubTasks])

    const changeTaskSequence = useCallback((dndResult) =>{

        let taskToChange = {};
        let tasksToChange = [];
        
        if (dndResult.source.index < dndResult.destination.index){
            for (let i=dndResult.source.index-1; i<=dndResult.destination.index-1; ++i){
                taskToChange = tasks[i];
                if (taskToChange.sequence === dndResult.source.index){                   
                    taskToChange.sequence = dndResult.destination.index;
                    tasksToChange.push(taskToChange);
                }
                else if (taskToChange.sequence <= dndResult.destination.index){
                    taskToChange.sequence = i;
                    tasksToChange.push(taskToChange);
                }
            }
        }
        else{
            for (let i=dndResult.destination.index-1; i<=dndResult.source.index-1; ++i){
                taskToChange = tasks[i];
                if (taskToChange.sequence === dndResult.source.index){
                    taskToChange.sequence = dndResult.destination.index;
                    tasksToChange.push(taskToChange);
                }
                else if (taskToChange.sequence <= dndResult.source.index){
                    taskToChange.sequence = i+2;
                    tasksToChange.push(taskToChange);
                }
            }
        }

        tasksToChange.forEach(task => {
            axios.put("http://185.246.66.84:3000/llerman/tasks/" + task.id, {
                ...task           
            })
        })
        setTasks(prev => prev.map(item => {
            if (tasksToChange.some(elem => elem.id === item.id)){
                return {...item, sequence: tasksToChange.filter(task => task.id === item.id)[0].sequence}
            }
            return item;
        }).sort((a,b) => a.sequence - b.sequence));
    },[tasks, setTasks])

    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            <SubTaskContext.Provider value={[subTasks, setSubTasks]}>
                <TaskForm showCompletedTasks={false}
                addButtonClick={addTask}
                removeButtonClick={removeTask}
                onStatusChange={checkTask}
                onTitleChange={renameTask}
                addSubTask={addSubTask}
                removeSubTask={removeSubTask}
                renameSubTask={renameSubTask}
                checkSubTask={checkSubTask}
                changeTaskSequence={changeTaskSequence}/>
                <TaskForm showCompletedTasks={true} addButtonClick={addTask} removeButtonClick={removeTask} onStatusChange={checkTask}/>
            </SubTaskContext.Provider>
        </TaskContext.Provider>
      );
}

export default TaskData;