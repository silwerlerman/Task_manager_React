function Task({item}){
    
    if(!item.completed){
        return (
            <div class="task task-todo">
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
    else{
        return (
            <div class="task task-completed">
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
    
}

export default Task;