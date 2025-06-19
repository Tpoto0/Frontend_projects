import React from 'react';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const handleCheckbox = () => {
    const updatedTodo = { ...todo, done: !todo.done };
    onUpdate(updatedTodo);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleCheckbox}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button class="delButton" onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;