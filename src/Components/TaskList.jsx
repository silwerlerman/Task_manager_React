import cn from "class-names"
import { useContext, useMemo } from "react";
import styles from "../Fonts/TaskList.module.sass"
import Task from "./Task";
import TaskContext from '../TaskContext';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

function TaskList({completedTasks, removeButtonClick, onStatusChange, onTitleChange, addSubTask, removeSubTask, renameSubTask, checkSubTask, changeTaskSequence}){

    const [tasks] = useContext(TaskContext);

    const filteredArr = useMemo(() => {
        if (tasks.length !== 0) {
            if (completedTasks) return tasks.filter(task => task.completed);
            else return tasks.filter(task =>!task.completed);
        }
        else return [];
    },[tasks]) 

    function handleOnDragEnd(result){
        if (!result.destination) return;
        changeTaskSequence(result);
        console.log(result);
    }

    return !completedTasks ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <div className={cn(styles.list)} {...provided.droppableProps} ref ={provided.innerRef}>
                        {filteredArr.map((task,index) => {
                            return (
                                <Draggable key={index} draggableId={"" + index} index={++index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <Task task={task} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange} onTitleChange={onTitleChange} addSubTask={addSubTask} removeSubTask={removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    ) : (
        <div className={cn(styles.list)}>
            {filteredArr.map(task => <Task key={task.id} task={task} removeButtonClick={removeButtonClick} onStatusChange={onStatusChange} onTitleChange={onTitleChange} addSubTask={addSubTask} removeSubTask={removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>)}
        </div>
    )
}

export default TaskList;