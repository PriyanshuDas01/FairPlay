'use client'
import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api';

interface Task {
  _id: string;
  body: string;
  completed: boolean;
}

const Tasks = () => {
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
    if (newTask.trim()) {
      try {
        const task = await createTask(newTask);
        setTasks((prev) => [...prev, task]);
        setNewTask('');
      } catch (error) {
        console.error('Failed to create task:', error);
      }
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Task List</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={handleCreateTask}
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <span
              className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
            >
              {task.body}
            </span>
            <div className="flex gap-3">
              {!task.completed && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={() => handleUpdateTask(task._id)}
                >
                  Complete
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
