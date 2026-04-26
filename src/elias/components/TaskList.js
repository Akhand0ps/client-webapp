import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function TaskList({ onTaskComplete }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/hr/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const toggleTask = (id, doneStatus, text) => {
    const updatedDone = !doneStatus;
    fetch(`${API_BASE}/hr/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: updatedDone })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
        if (updatedDone && onTaskComplete) onTaskComplete(text);
      });
  };

  const pendingCount = tasks.filter(t => !t.done).length;

  const priorityClass = (p) => {
    if (p === 'High') return 'p-high';
    if (p === 'Med') return 'p-med';
    return 'p-low';
  };

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">✅ My Tasks Today</div>
        <span className="task-badge">{pendingCount} pending</span>
      </div>
      <div className="card-body">
        {tasks.map(task => (
          <div className="task-item" key={task.id}>
            <div
              className={`task-check ${task.done ? 'done' : ''}`}
              onClick={() => toggleTask(task.id, task.done, task.text)}
            >
              {task.done ? '✓' : ''}
            </div>
            <div className={`task-text ${task.done ? 'done-text' : ''}`}>{task.text}</div>
            <span className={`priority ${priorityClass(task.priority)}`}>{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
