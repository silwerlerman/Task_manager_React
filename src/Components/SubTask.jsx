import { memo, useState } from 'react';
import cn from "class-names"
import styles from "../Fonts/Task.module.sass"

const SubTask = memo(({subTask, taskCompleted}) => {
    
    var title = subTask.title;
    const [readOnly, setReadOnly] = useState(true);
    
    return (
        <div className={cn(styles.item,{[styles.completed]:subTask.completed},{[styles.todo]:!subTask.completed})}>
            <div className={cn(styles.items)}>
                <input className={cn(styles.checkbox)} type="checkbox" defaultChecked={subTask.completed} disabled={taskCompleted} onChange={() => {}}/>
                {readOnly && <p className={cn(styles.text,{[styles.inputLineThrough]:subTask.completed})}>{title}</p>}
                {subTask.completed && !readOnly && <input className={cn({[styles.input]:readOnly})} type="text" placeholder={title} onChange={e => title = e.target.value}/>}
            </div>
            <div>
                {!taskCompleted && <button onClick={() => {
                    if (readOnly) setReadOnly(false);
                    else {
                        if (title !== "") {};
                        setReadOnly(true);
                    }
                }}>{readOnly ? "Редактировать" : "Сохранить"}</button>}
                {!taskCompleted && <button onClick={() => {}}>Удалить</button>}
            </div>
        </div>
    );
})

SubTask.displayName = "SubTask"

export default SubTask;