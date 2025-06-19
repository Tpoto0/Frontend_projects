import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo._id} 
            todo={todo} 
            onDelete={onDelete} 
            onUpdate={onUpdate} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;