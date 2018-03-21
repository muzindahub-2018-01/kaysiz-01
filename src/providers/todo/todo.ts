import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoProvider {

  private todos = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  archiveTodo(todoIndex){
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archivedTodos.push(todoToBeArchived);

  }

  getArchivedTodos(){
    return this.archivedTodos;
  }

  getTodos(){
    return this.todos;
  }

  addTodo(todo){
    this.todos.push(todo);
  }

  editTodo(todo, todoIndex){
    this.todos[todoIndex] = todo;
  }

}
