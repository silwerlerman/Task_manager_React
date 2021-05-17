import { useContext, useMemo } from "react";
import styles from "../Fonts/SubTaskList.module.sass"
import TaskContext from '../TaskContext';
import SubTaskContext from '../SubTaskContext';
import cn from "class-names"
import SubTask from "./SubTask";

function SubTaskList({taskId, taskCompleted, removeSubTask, renameSubTask, checkSubTask}){
    
    const [tasks] = useContext(TaskContext);
    const [subTasks] = useContext(SubTaskContext);
    
    const filteredArr = useMemo(() => {
        if (subTasks.length !== 0) {
            var arr = subTasks.filter(subTask => subTask.taskId === taskId);
            return arr !== undefined ? arr : []; 
        }
        else return [];
    },[tasks, subTasks]) 

    return (
        <div className={cn(styles.list)}>
            {filteredArr.map(subTask => <SubTask key={subTask.id} subTask={subTask} taskCompleted={taskCompleted} removeSubTask={removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>)}
        </div>
    );
}

export default SubTaskList;