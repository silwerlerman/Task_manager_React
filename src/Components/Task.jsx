import cn from "class-names"

function Task({item}){
    
    return (
        <div className={cn('task',{'task-completed':item.completed},{'task-todo':!item.completed})}>
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