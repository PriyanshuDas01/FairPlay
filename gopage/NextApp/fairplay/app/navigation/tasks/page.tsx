'use client'

import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api';

interface Task {
  _id: string;
  body: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (newTask.trim()) {
      try {
        const task = await createTask(newTask);
        setTasks((prev) => (prev ? [...prev, task] : [task]));
        setNewTask('');
      } catch (error) {
        console.error('Failed to create task:', error);
        setError('Failed to create task. Please try again.');
      }
    }
  };

  const handleUpdateTask = async (id: string, updatedBody: string, completed: boolean = false) => {
    try {
      await updateTask(id, updatedBody, completed);
      setTasks((prev) =>
        prev ? prev.map((task) =>
          task._id === id ? { ...task, body: updatedBody, completed } : task
        ) : null
      );
    } catch (error) {
      console.error('Failed to update task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev ? prev.filter((task) => task._id !== id) : null);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-lg text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
      </div>
    );
  }

  const todoTasks = tasks?.filter(task => !task.completed) || [];
  const completedTasks = tasks?.filter(task => task.completed) || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Task Manager</h2>
        <div className="flex gap-4 max-w-2xl">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700 text-lg"
          />
          <button
            onClick={handleCreateTask}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors text-lg font-medium min-w-[120px] shadow-lg shadow-blue-100"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* To Do Column */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            To Do
            <span className="ml-2 text-sm text-gray-500">({todoTasks.length})</span>
          </h3>
          {todoTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No pending tasks</p>
          ) : (
            <ul className="space-y-3">
              {todoTasks.map((task) => (
                <li 
                  key={task._id} 
                  className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={async () => {
                        await handleUpdateTask(task._id, task.body, true);
                      }}
                      className="mt-1 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      Done
                    </button>
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={task.body}
                        onChange={(e) => handleUpdateTask(task._id, e.target.value)}
                        className="w-full bg-transparent border-0 p-0 focus:ring-0 text-gray-700"
                      />
                      <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Column */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Completed
            <span className="ml-2 text-sm text-gray-500">({completedTasks.length})</span>
          </h3>
          {completedTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No completed tasks</p>
          ) : (
            <ul className="space-y-3">
              {completedTasks.map((task) => (
                <li 
                  key={task._id} 
                  className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={task.body}
                        onChange={(e) => handleUpdateTask(task._id, e.target.value, true)}
                        className="w-full bg-transparent border-0 p-0 focus:ring-0 text-gray-500 line-through"
                        readOnly
                      />
                      <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

