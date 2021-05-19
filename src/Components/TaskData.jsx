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
        axios.delete("http://185.246.66.84:3000/llerman/tasks/" + id)
        .then(response => {
            setTasks(prev =>
                prev.filter(curr => curr.id !== id)
            );
        })
        .catch(error => console.log(error));
    },[setTasks])
    
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

        const sourceTask = tasks.filter(task => task.sequence === dndResult.source.index);
        const destinationTask = tasks.filter(task => task.sequence === dndResult.destination.index);

        let firstTaskToChange = {
            completed: sourceTask[0].completed,
            title: sourceTask[0].title,
            sequence: dndResult.destination.index             
        }

        let secondTaskToChange = {
            completed: destinationTask[0].completed,
            title: destinationTask[0].title,
            sequence: dndResult.source.index
        }

        setTasks(prev =>{
            return [
                ...prev.filter(curr => curr.id !== sourceTask[0].id && curr.id !== destinationTask[0].id),
                firstTaskToChange,
               secondTaskToChange
            ].sort((a,b) => a.sequence - b.sequence);
        });    
        //axios.put("http://185.246.66.84:3000/llerman/tasks/" + sourceTask[0].id, firstTaskToChange)
        //.then(response => {
        //    axios.put("http://185.246.66.84:3000/llerman/tasks/" + destinationTask[0].id, secondTaskToChange)
        //    .then(response => {
        //        setTasks(prev =>{
        //            return [
        //                ...prev.filter(curr => curr.id !== sourceTask[0].id && curr.id !== destinationTask[0].id),
        //                firstTaskToChange,
        //                secondTaskToChange
        //            ].sort((a,b) => a.sequence - b.sequence);
        //        });                
        //    })
        //    .catch(error => console.log(error))
        //})
        //.catch(error => console.log(error))
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