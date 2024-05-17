import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    updateTodo(todo.id, { ...todo, title: newTitle });
    setIsEditing(false);
  };

  const handleComplete = () => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <Form.Control
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span onClick={handleComplete} style={{ cursor: 'pointer' }}>
          {todo.title}
        </span>
      )}
      <div>
        {isEditing ? (
          <Button variant="primary" onClick={handleUpdate} className='me-2'>
            Save
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleEdit} className='me-2'>
            Edit
          </Button>
        )}
        <Button variant="danger" onClick={() => deleteTodo(todo.id)}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
