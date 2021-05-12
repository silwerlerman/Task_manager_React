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
              <div class="list">
                <div class="list__header">
                  <h2>Текущие задания</h2>
                  <button>Добавить</button>
                </div>
                <ul class="task__list">
                    {tasks.map(task => (
                        <div class="task">
                          <div>
                            <input type="checkbox"/>
                            <input type="text" value={task.title} readOnly="true"/>
                          </div>
                          <div>
                            <button>Редактировать</button>
                            <button>Удалить</button>
                          </div>
                        </div> 
                    ))}
                </ul>
              </div>
            </div>         
        </>
    );
}

export default TasksData;