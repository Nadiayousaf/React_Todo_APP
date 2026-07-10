import { useState } from "react";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      task: "Sample Task",
      done: false,
    },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  const addNewTask = () => {
    if (newTodo.trim() === "") return;

    const newTask = {
      task: newTodo,
      done: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  // Delete Task
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Update Task
  const updateTodo = (index) => {
    if (newTodo.trim() === "") {
      alert("Please enter a new task.");
      return;
    }

    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          task: newTodo,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
    setNewTodo("");
  };

  // Done / Undo
  const markDone = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          done: !todo.done,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>📝 Todo App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTodo}
          onChange={updateTodoValue}
        />

        <button className="add-btn" onClick={addNewTask}>
          Add Task
        </button>
      </div>

      <h2>Todo List</h2>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span className={todo.done ? "task done" : "task"}>
              {todo.done ? "✔ " : ""}
              {todo.task}
            </span>

            <div className="buttons">
              <button
                className="delete-btn"
                onClick={() => deleteTodo(index)}
              >
                🗑 Delete
              </button>

              <button
                className="update-btn"
                onClick={() => updateTodo(index)}
              >
                ✏ Update
              </button>

              <button
                className="done-btn"
                onClick={() => markDone(index)}
              >
                {todo.done ? "↩ Undo" : "✔ Done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}