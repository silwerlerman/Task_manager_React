import cn from "class-names"
import styles from "../Fonts/Task.module.sass"
import { memo } from 'react';

const Task = memo(({task, removeButtonClick, onStatusChange}) => {
    
    return (
        <div className={cn(styles.item,{[styles.completed]:task.completed},{[styles.todo]:!task.completed})}>
            <div>
                <input className={cn(styles.checkbox)} type="checkbox" defaultChecked={task.completed} disabled={task.completed} onChange={() => onStatusChange(task)}/>
                <input className={cn(styles.input,{[styles.inputLineThrough]:task.completed})} type="text" value={task.title}/>
            </div>
            <div>
                {task.completed && <button onClick={() => {
                    onStatusChange(task);
                }}>Восстановить</button>}
                {!task.completed && <button>Редактировать</button>}
                {!task.completed && <button onClick={() => removeButtonClick(task.id)}>Удалить</button>}
            </div>
        </div>
    );
    
})

export default Task;