import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Todo } from "./todo";

@Injectable()
export class AppService {

  serverUrl: string = environment.apiUrl;

  // Placeholder for todos
  todos: Todo[] = [];

  constructor(private http: HttpClient) {

    this.http.get<Todo[]>(this.serverUrl)
      .subscribe(
        (res) =>
          this.todos = res ? res : []
      );
  }

  get lastId() {
    return this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1;

  }

  // Simulate POST /todos
  addTodo(todo: Todo): AppService {
    if (!todo.id) {
      todo.id = this.lastId;
    }
    this.todos.push(todo);
    this.http.post(this.serverUrl, todo).subscribe();
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): AppService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.http.delete(this.serverUrl + '/' + id).subscribe();
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Todo): Todo | null {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }

    Object.assign(todo, values);
    this.http.patch(this.serverUrl + '/' + id, values).subscribe();

    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo | null {
    const todo = this.todos.filter(todo => todo.id === id).pop();
    if (!todo) return null;
    return todo;
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    const todo$: Todo | null = this.getTodoById(todo.id);

    if (!todo$) return null;

    let updatedTodo = this.updateTodoById(todo.id, {
      ...todo$,
      completed: !todo.completed
    });

    return updatedTodo;
  }
}
