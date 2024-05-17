import 'package:flutter/material.dart';
import '../models/todo.dart';
import '../services/file_service.dart';
import '../widgets/todo_item.dart';
import 'todo_form_screen.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Todo> _todos = [];

  @override
  void initState() {
    super.initState();
    _loadTodos();
  }

  Future<void> _loadTodos() async {
    final todos = await FileService.readTodos();
    setState(() {
      _todos = todos;
    });
  }

  void _addTodo() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => TodoFormScreen()),
    );
    if (result != null) {
      setState(() {
        _todos.add(result);
      });
      FileService.writeTodos(_todos);
    }
  }

  void _editTodo(Todo todo) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => TodoFormScreen(todo: todo)),
    );
    if (result != null) {
      setState(() {
        int index = _todos.indexWhere((t) => t.id == todo.id);
        if (index != -1) {
          _todos[index] = result;
        }
      });
      FileService.writeTodos(_todos);
    }
  }

  void _deleteTodo(Todo todo) {
    setState(() {
      _todos.removeWhere((t) => t.id == todo.id);
    });
    FileService.writeTodos(_todos);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Todo List'),
      ),
      body: _todos.isEmpty
          ? Center(child: Text('No todos yet!'))
          : ListView.builder(
              itemCount: _todos.length,
              itemBuilder: (context, index) {
                final todo = _todos[index];
                return TodoItem(
                  todo: todo,
                  onEdit: () => _editTodo(todo),
                  onDelete: () => _deleteTodo(todo),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addTodo,
        child: Icon(Icons.add),
      ),
    );
  }
}
