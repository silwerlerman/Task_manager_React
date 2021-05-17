import cn from "class-names"
import { useContext, useMemo } from "react";
import styles from "../Fonts/TaskList.module.sass"
import Task from "./Task";
import TaskContext from '../TaskContext';

function TaskList({completedTasks, removeButtonClick, onStatusChange, onTitleChange, addSubTask, removeSubTask, renameSubTask, checkSubTask}){

    const [tasks] = useContext(TaskContext);

    const filteredArr = useMemo(() => {
        if (tasks.length !== 0) {
            if (completedTasks) return tasks.filter(task => task.completed);
            else return tasks.filter(task =>!task.completed);
        }
        else return [];
    },[tasks]) 

    return (
        <div className={cn(styles.list)}>
            {filteredArr.map(task => <Task key={task.id} task={task} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange} onTitleChange={onTitleChange} addSubTask={addSubTask} removeSubTask={removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>)}
        </div>
    );
}

export default TaskList;