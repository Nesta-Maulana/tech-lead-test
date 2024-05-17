import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../models/todo.dart';

class FileService {
  static Future<File> _getFile() async {
    final directory = await getApplicationDocumentsDirectory();
    return File('${directory.path}/todos.json');
  }

  static Future<List<Todo>> readTodos() async {
    try {
      final file = await _getFile();
      if (!await file.exists()) return [];
      final contents = await file.readAsString();
      final jsonList = json.decode(contents) as List;
      return jsonList.map((json) => Todo.fromJson(json)).toList();
    } catch (e) {
      return [];
    }
  }

  static Future<void> writeTodos(List<Todo> todos) async {
    final file = await _getFile();
    final jsonList = todos.map((todo) => todo.toJson()).toList();
    final contents = json.encode(jsonList);
    await file.writeAsString(contents);
  }
}
