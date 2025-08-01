import { Component, inject } from '@angular/core';
import { TodosApi } from './todos-api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.html',
  providers: [TodosApi],
  imports:[ReactiveFormsModule, FormsModule]

})
export class Todos {
  todoApi = inject(TodosApi);
  todoList: any = [];

  todoForm !: FormGroup;
    fb = inject(FormBuilder);

  ngOnInit() {
    this.todoForm = this.fb.group({
            userId:['',Validators.required],
            title:['', Validators.required],
            completed:['', Validators.required]
        })
         this.getTodos();
  }
 postTodo(){
        this.todoApi.postTodo(this.todoForm.value).subscribe({
          next:(res: any) => {
            this.todoList = res;
            this.getTodos();
          },
          error:(err) => {
            console.log(err);
          },
        })
    }

  getTodos() {
    this.todoApi.getTodos().subscribe({
      next: (res: any) => {
        this.todoList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeStatus(todo: any) {
    todo.completed = !todo.completed;
    this.todoApi.updateTodo(todo).subscribe({
      next: (res) => {
        console.log(res);
        alert('Todo status changed');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteTodo(id: number) {
    this.todoApi.deleteTodo(id).subscribe({
      next: (res) => {
        console.log(res);
        alert('Todo item deleted');
        this.getTodos();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
