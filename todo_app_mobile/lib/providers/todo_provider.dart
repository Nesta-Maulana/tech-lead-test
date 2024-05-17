import 'package:flutter/material.dart';
import '../models/todo.dart';
import '../services/file_service.dart';

class TodoProvider with ChangeNotifier {
  List<Todo> _todos = [];

  List<Todo> get todos => _todos;

  void loadTodos() async {
    _todos = await FileService.readTodos();
    notifyListeners();
  }

  void addTodo(Todo todo) {
    _todos.add(todo);
    FileService.writeTodos(_todos);
    notifyListeners();
  }

  void updateTodo(Todo todo) {
    int index = _todos.indexWhere((t) => t.id == todo.id);
    if (index != -1) {
      _todos[index] = todo;
      FileService.writeTodos(_todos);
      notifyListeners();
    }
  }

  void deleteTodo(Todo todo) {
    _todos.removeWhere((t) => t.id == todo.id);
    FileService.writeTodos(_todos);
    notifyListeners();
  }
}
