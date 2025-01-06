import React, { useState } from 'react';

const TodoList = () => {
  
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = { id: Date.now(), text: taskInput };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskInput(taskToEdit.text);
    setIsEditing(true);
    setEditIndex(id);
  };

  
  const updateTask = () => {
    if (taskInput.trim() !== '') {
      const updatedTasks = tasks.map((task) =>
        task.id === editIndex ? { ...task, text: taskInput } : task
      );
      setTasks(updatedTasks);
      setTaskInput('');
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter a task"
      />
      {isEditing ? (
        <button onClick={updateTask}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
