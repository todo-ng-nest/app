import { Component, OnInit } from "@angular/core";

// Import class so we can register it as dependency injection token
import { AppService } from "./app.service";
import { Todo } from "./todo";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  newTodo: Todo = new Todo();

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  constructor(private appService: AppService) {}

  ngOnInit() {
    
  }

  addTodo() {
    this.appService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  // Service is now available as this.todoDataService
  toggleTodoComplete(todo: Todo) {
    this.appService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.appService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.appService.getAllTodos();
  }
}
