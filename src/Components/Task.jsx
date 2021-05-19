import cn from "class-names"
import styles from "../Fonts/Task.module.sass"
import { memo, useState,useContext } from 'react';
import SubTaskList from "./SubTaskList";
import SubTaskContext from '../SubTaskContext';

const Task = memo(({task, removeButtonClick, onStatusChange, onTitleChange, addSubTask, removeSubTask, renameSubTask, checkSubTask}) => {
    
    var title = task.title;
    const [readOnly, setReadOnly] = useState(true);
    const [subTasks] = useContext(SubTaskContext);

    function hasSubTasks(){
        let arr = subTasks.filter(subTask => subTask.taskId === task.id);
        const result = arr.length !== 0 ? true : false
        return result;
    }

    return (
        <div>
            <div className={cn(styles.item,{[styles.completed]:task.completed},{[styles.todo]:!task.completed})}>
                <div className={cn(styles.items)}>
                    <input className={cn(styles.checkbox)} type="checkbox" defaultChecked={task.completed} disabled={task.completed} onChange={() => onStatusChange(task)}/>
                    {readOnly && <p className={cn(styles.text,{[styles.inputLineThrough]:task.completed})}>{title}</p>}
                    {!task.completed && !readOnly && <input className={cn({[styles.input]:readOnly})} type="text" placeholder={title} onChange={e => title = e.target.value}/>}
                </div>
                <div>
                    {task.completed && <button onClick={() => onStatusChange(task)}>Восстановить</button>}
                    {!task.completed && <button onClick={() => {
                        if (readOnly) setReadOnly(false);
                        else {
                            if (title !== "") onTitleChange(task, title);
                            setReadOnly(true);
                        }
                    }}>{readOnly ? "Редактировать" : "Сохранить"}</button>}
                    {!task.completed && <button onClick={() => addSubTask(task.id)}>+ Подзадача</button>}
                    {!task.completed && <button onClick={() => removeButtonClick(task.id)}>Удалить</button>}
                    <h5>Seq:{task.sequence}</h5>
                </div> 
            </div>
            <div>
                <div>
                    {hasSubTasks() && <SubTaskList taskId={task.id} taskCompleted={task.completed} removeSubTask={removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>}
                </div>
            </div>           
        </div>
    );
})

Task.displayName = "Task"

export default Task;