import { useState, useEffect } from 'react'
import axios from 'axios'

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
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
            </div>         
        </>
    );
}

export default TasksData;