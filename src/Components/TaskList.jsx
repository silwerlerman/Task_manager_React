import cn from "class-names"
import styles from "../Fonts/TaskList.module.sass"
import Task from "./Task";

function TaskList({tasks, completedTasks}){
    return (
        <div className={cn(styles.list)}>
            {tasks.map(task => (<Task item={task}/>))}
        </div>
    );
}

export default TaskList;