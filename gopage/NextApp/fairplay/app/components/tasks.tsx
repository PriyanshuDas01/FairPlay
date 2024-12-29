"use client"
import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api';

interface Task {
  _id: string;
  body: string;
  completed: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const task = await createTask(newTask);
      setTasks((prev) => [...prev, task]);
      setNewTask('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (id: string) => {
    try {
      await updateTask(id);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleCreateTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.body}
            </span>
            {!task.completed && (
              <button onClick={() => handleUpdateTask(task._id)}>Complete</button>
            )}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
