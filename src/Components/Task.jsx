import cn from "class-names"
import styles from "../Fonts/Task.module.sass"

function Task({task}){
    
    return (
        <div className={cn(styles.item,{[styles.completed]:task.completed},{[styles.todo]:!task.completed})}>
            <div>
                <input className={cn(styles.checkbox)} type="checkbox" defaultChecked={task.completed} disabled={task.completed}/>
                <input className={cn(styles.input,{[styles.inputLineThrough]:task.completed})} type="text" value={task.title} readOnly="true"/>
            </div>
            <div>
                {task.completed && <button>Восстановить</button>}
                {!task.completed && <button>Редактировать</button>}
                {!task.completed && <button>Удалить</button>}
            </div>
        </div>
    );
    
}

export default Task;