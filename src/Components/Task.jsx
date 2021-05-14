import cn from "class-names"
import styles from "../Fonts/Task.module.sass"
import { memo, useState } from 'react';

const Task = memo(({task, removeButtonClick, onStatusChange, onTitleChange}) => {
    
    var title = task.title;
    const [readOnly, setReadOnly] = useState(true);

    return (
        <div className={cn(styles.item,{[styles.completed]:task.completed},{[styles.todo]:!task.completed})}>
            <div>
                <input className={cn(styles.checkbox)} type="checkbox" defaultChecked={task.completed} disabled={task.completed} onChange={() => onStatusChange(task)}/>
                <input className={cn({[styles.input]:readOnly},{[styles.inputLineThrough]:task.completed})} type="text" placeholder={title} readOnly={readOnly} onChange={e => title = e.target.value}/>
            </div>
            <div>
                {task.completed && <button onClick={() => onStatusChange(task)}>Восстановить</button>}
                {!task.completed && <button onClick={() => {
                    if (readOnly) setReadOnly(false);
                    else {
                        onTitleChange(task, title);
                        setReadOnly(true);
                    }
                }}>{readOnly ? "Редактировать" : "Сохранить"}</button>}
                {!task.completed && <button onClick={() => removeButtonClick(task.id)}>Удалить</button>}
            </div>
        </div>
    );
    
})

export default Task;