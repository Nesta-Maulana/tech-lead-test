import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { Container, Row, Col } from "react-bootstrap";
import "./../App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = (todo) => {
    axios
      .post("http://localhost:5000/todos", todo)
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
  };

  const updateTodo = (id, updatedTodo) => {
    axios
      .put(`http://localhost:5000/todos/${id}`, updatedTodo)
      .then((response) => {
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      })
      .catch((error) => console.error(error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Todo App</h1>

          <TodoForm addTodo={addTodo} />

          <Row>
            <Col md={6} className="pull-right">
            </Col>
            <Col md={6} className="pull-right">
              <input
                type="text"
                placeholder="Search todos..."
                className="form-control my-3"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

          <TodoList
            todos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TodoApp;
