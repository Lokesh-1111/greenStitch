import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [flag, setFlag] = useState(false);
  const [inputTask, setInputTask] = useState('');
  const [inputDescription, setInputDesciption] = useState([])

  //This function is used to add task and description 

  const addTask = (title, description) => {
    setTasks([...tasks, { id: Date.now(), title, description, status: 'pending' }]);
  };

  //This function is used to move task from one status to another

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
            ...task,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date() : task.completedAt,
          }
          : task
      )
    );
  };


  //This function is used to handle taskInput and description Input 

  const handleClick = () => {
    addTask(inputTask, inputDescription);
    setFlag(!flag);
    setInputTask('')
  }

  return (
    <div className="container">
      <div className="section">
        <h2>TO DO</h2>
        <ul>
          {tasks.filter((task) => task.status === 'pending').map((task) => (
            <li key={task.id} className='tasks'>
              <div className="task">
                <span className="task-title">{task.title}</span>
                <div className="task-buttons">
                  <button onClick={() => moveTask(task.id, 'in-progress')}>Start</button>
                </div>
              </div>
              <div style={{ wordWrap: "break-word", wordBreak: 'break-all', whiteSpace: 'normal' }}>
                {task.description}
              </div>
            </li>
          ))}
        </ul>
        <button onClick={() => setFlag(!flag)}>Create Issue</button>
        {flag &&
          <div className='inputs'>
            <input
              autoFocus
              placeholder='New Task'
              onChange={(e) => setInputTask(e.target.value)}
              type='text'
              value={inputTask}
              required
              style={{ marginBottom: "0.3rem" }}
            />
            <input
              placeholder='description'
              type='text'
              style={{ marginBottom: "0.3rem" }}
              onChange={(e) => setInputDesciption(e.target.value)}
            />
            <button onClick={handleClick}>Create</button>
          </div>
        }
      </div>
      <div className="section in-progress">
        <h2>IN PROGRESS</h2>
        <ul>
          {tasks.filter((task) => task.status === 'in-progress').map((task) => (
            <li key={task.id} className="tasks">
              <div className='task'>
                <span className="task-title">{task.title}</span>
                <div className="task-buttons">
                  <button onClick={() => moveTask(task.id, 'completed')}>Complete</button>
                </div>
              </div>
              <div style={{ wordWrap: "break-word", wordBreak: 'break-all', whiteSpace: 'normal' }}>
                {task.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="section done">
        <h2>DONE</h2>
        <ul>
          {tasks.filter((task) => task.status === 'completed').map((task) => (
            <li key={task.id} className="tasks">
              <div className='task'>
                <span className="task-title">
                  {task.title}<span className="timestamp"> - {task.completedAt.toLocaleString()}</span>
                </span>
              </div>
              <div style={{ wordWrap: "break-word", wordBreak: 'break-all', whiteSpace: 'normal',textAlign:'justify' }}>
                {task.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;