import TaskList from "./TaskList";
import styles from "../Fonts/TaskForm.module.sass"
import cn from "class-names"

function TaskForm({tasksArr, showCompletedTasks}){

    return (
        <div className={cn(styles.form)}>
            <div class="list__header">
                <div><h2>{!showCompletedTasks ? "Завершенные задачи" : "Текущие задачи"}</h2></div>
                {showCompletedTasks && <div className={cn(styles.addbutton)}><button>Добавить</button></div>}
            </div>
            <TaskList tasks={tasksArr} completedTasks={showCompletedTasks}/>
        </div>
    );
}

export default TaskForm;