import cn from "class-names"
import { useContext, useMemo } from "react";
import styles from "../Fonts/TaskList.module.sass"
import Task from "./Task";
import AppContext from '../AppContext';

function TaskList({completedTasks, removeButtonClick, onStatusChange}){

    const [tasks] = useContext(AppContext);

    const arr = useMemo(() => {
        if (tasks.length !== 0) {
            if (completedTasks) return tasks.filter(task => task.completed);
            else return tasks.filter(task =>!task.completed);
        }
        else return [];
    },[tasks]) 

    return (
        <div className={cn(styles.list)}>
            {arr.map(task => <Task key={task.id} task={task} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange}/>)}
        </div>
    );
}

export default TaskList;