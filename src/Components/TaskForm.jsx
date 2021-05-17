import TaskList from "./TaskList";
import styles from "../Fonts/TaskForm.module.sass"
import cn from "class-names"

function TaskForm({showCompletedTasks, addButtonClick, removeButtonClick, onStatusChange, onTitleChange, addSubTask, removeSubTask, renameSubTask, checkSubTask}){  
    debugger
    return (
        <div className={cn(styles.form)}>
            <div class="list__header">
                <div><h2>{showCompletedTasks ? "Завершенные задачи" : "Текущие задачи"}</h2></div>
                {!showCompletedTasks && <div className={cn(styles.addbutton)}><button onClick={addButtonClick}>Добавить</button></div>}
            </div>
            <TaskList completedTasks={showCompletedTasks} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange} onTitleChange={onTitleChange} addSubTask={addSubTask} removeSubTask={removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>
        </div>
    );
}

export default TaskForm;