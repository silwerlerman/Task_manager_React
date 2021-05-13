import cn from "class-names"
import { useEffect } from "react";
import styles from "../Fonts/TaskList.module.sass"
import Task from "./Task";

function TaskList({tasks, completedTasks, removeButtonClick, onStatusChange}){

    var arr = !completedTasks ? tasks.filter(task => task.completed) : tasks.filter(task =>!task.completed); 
    
    return (
        <div className={cn(styles.list)}>
            {arr.map(task => <Task key={task.id} task={task} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange}/>)}
        </div>
    );
}

export default TaskList;