import TaskList from "./TaskList";
import styles from "../Fonts/TaskForm.module.sass"
import cn from "class-names"
import AppContext from '../AppContext';
import { useContext } from 'react';

function TaskForm({showCompletedTasks, addButtonClick, removeButtonClick, onStatusChange}){  

    const [tasks] = useContext(AppContext);

    return (
        <div className={cn(styles.form)}>
            <div class="list__header">
                <div><h2>{showCompletedTasks ? "Завершенные задачи" : "Текущие задачи"}</h2></div>
                {!showCompletedTasks && <div className={cn(styles.addbutton)}><button onClick={() =>{addButtonClick(tasks.length)}}>Добавить</button></div>}
            </div>
            <TaskList completedTasks={showCompletedTasks} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange}/>
        </div>
    );
}

export default TaskForm;