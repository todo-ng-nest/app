import { Component, OnInit } from "@angular/core";

// Import class so we can register it as dependency injection token
import { TodoDataService } from "./todo-data.service";
import { Todo } from "./todo";
import { TodoServerService } from "./todo-server.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {
  newTodo: Todo = new Todo();

  app: any = {};

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  constructor(private todoDataService: TodoDataService, private todoServerService: TodoServerService) {}

  ngOnInit() {
    this.todoServerService.connect().subscribe(data => {
      this.app = data;
    });
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  // Service is now available as this.todoDataService
  toggleTodoComplete(todo: Todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
