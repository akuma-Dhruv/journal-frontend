import { useState, useEffect } from "react";

export default function TodoList({ onChange }) {
  const [todos, setTodos] = useState([
    { id: 1, text: "", done: false }
  ]);

  function addTodo() {
    setTodos([...todos, { id: Date.now(), text: "", done: false }]);
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function editTodo(id, value) {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, text: value } : t
      )
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  // ===== SEND CHANGES TO PARENT =====
  useEffect(() => {
    if (onChange) onChange(todos);
  }, [todos, onChange]);

  // ===== RETURN BLOCK =====
  return (
    <div>
      {todos.map(todo => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12
          }}
        >
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
            style={{ width: 22, height: 22 }}
          />

          <input
            value={todo.text}
            onChange={(e) => editTodo(todo.id, e.target.value)}
            placeholder="Write a task…"
            style={{
              borderBottom: "1px dashed #9b9383",
              background: "transparent",
              border: "none",
              flex: 1,
              minWidth: 100,
              outline: "none",
              fontSize: 18,
              padding: "4px 4px",
              color: "#3b372c"
            }}
          />

          <button
            onClick={() => removeTodo(todo.id)}
            aria-label="remove todo"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#a66",
              fontSize: 18,
              padding: 6
            }}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addTodo}
        style={{
          padding: "8px 14px",
          fontSize: 16,
          background: "#efe7d8",
          border: "1px dashed #c7bba3",
          borderRadius: 8,
          cursor: "pointer",
          marginTop: 6
        }}
      >
        + Add Todo
      </button>
    </div>
  );
}
