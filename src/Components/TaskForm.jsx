import TaskList from "./TaskList";
import styles from "../Fonts/TaskForm.module.sass"
import cn from "class-names"

function TaskForm({tasksArr, showCompletedTasks, addButtonClick, removeButtonClick, onStatusChange}){

    return (
        <div className={cn(styles.form)}>
            <div class="list__header">
                <div><h2>{!showCompletedTasks ? "Завершенные задачи" : "Текущие задачи"}</h2></div>
                {showCompletedTasks && <div className={cn(styles.addbutton)}><button onClick={() =>{addButtonClick(tasksArr.length)}}>Добавить</button></div>}
            </div>
            <TaskList tasks={tasksArr} completedTasks={showCompletedTasks} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange}/>
        </div>
    );
}

export default TaskForm;