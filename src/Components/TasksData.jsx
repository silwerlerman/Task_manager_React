import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../Fonts/TaskElement.sass'

function TasksData(props){
    
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]); 
    
    /*useEffect(()=>{
        fetch(props.reqAddr)
        .then(res => res.json())
        .then(
          (result) => {
            setTasks(result);
          },
          (error) => {
            setError(error);
          }
        )
      }, [])*/

    useEffect(() => {
        axios.get(props.reqAddr)
        .then(res => setTasks(res.data))
        .catch(err => setError(err))
    },[])

    return (
        <>
            <div className="app">
                <ul>
                    {tasks.map(task => (
                        <div class="task">{task.title}</div> 
                    ))}
                </ul>
            </div>         
        </>
    );
}

export default TasksData;