import cn from "class-names"
import styles from "../Fonts/Task.module.sass"

function Task({item}){
    
    return (
        <div className={cn(styles.item,{[styles.completed]:item.completed},{[styles.todo]:!item.completed})}>
            <div>
                <input type="checkbox"/>
                <input type="text" value={item.title} readOnly="true"/>
            </div>
            <div>
                <button>Редактировать</button>
                <button>Удалить</button>
            </div>
        </div>
    );
    
}

export default Task;