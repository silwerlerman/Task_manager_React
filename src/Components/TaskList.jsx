import cn from "class-names"
import { useEffect } from "react";
import styles from "../Fonts/TaskList.module.sass"
import Task from "./Task";

function TaskList({tasks, completedTasks}){

    var arr = !completedTasks ? tasks.filter(task => task.completed) : tasks.filter(task =>!task.completed); 
    
    return (
        <div className={cn(styles.list)}>
            {arr.map(task => <Task item={task}/>)}
        </div>
    );
}

export default TaskList;