import { Component, inject } from '@angular/core';
import { TodosApi } from './todos-api';

@Component({
  selector: 'app-todos',
  template: `
    <div class="container mx-auto w-full max-w-7xl p-6">
      <div class="flex justify-end">
        <button
          class=" bg-cyan-500 p-2 px-4 text-white mb-2  rounded-xl cursor-pointer"
        >
          Add Todo
        </button>
      </div>

      <table
        class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md"
      >
        <thead class="bg-gray-200 text-gray-700 text-left">
          <tr>
            <th class="py-3 px-4 border-b">ID</th>
            <th class="py-3 px-4 border-b">User ID</th>

            <th class="py-3 px-4 border-b">Title</th>
            <th class="py-3 px-4 border-b">Completed</th>
            <th class="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for(todo of todoList; track todo.id){
          <tr class="hover:bg-gray-50">
            <td class="py-3 px-4 border-b">{{ todo.id }}</td>
            <td class="py-3 px-4 border-b">{{ todo.userId }}</td>

            <td class="py-3 px-4 border-b">{{ todo.title }}</td>
            <td class="py-3 px-4 border-b">
              @if (todo.completed) {
              <span class="text-green-500 text-xl"
                ><i class="fa fa-check-square" aria-hidden="true"></i
              ></span>
              }@else {
              <span class="text-red-500 text-xl"
                ><i class="fa fa-times" aria-hidden="true"></i
              ></span>
              }
            </td>
            <td class="py-3 px-4 border-b">
              @if (todo.completed) {
              <button
                (click)="changeStatus(todo)"
                class="p-1 px-4 bg-amber-500 text-xs text-white rounded-2xl cursor-pointer"
              >
                Mark as incomplete
              </button>
              }@else {
              <button
                (click)="changeStatus(todo)"
                class="p-1 px-4 bg-green-500 text-xs text-white rounded-2xl cursor-pointer"
              >
                Mark as complete
              </button>
              <button
                (click)="deleteTodo(todo.id)"
                class="p-1 px-4 bg-red-500 text-xs ml-3 text-white rounded-2xl cursor-pointer"
              >
                Delete
              </button>
              }
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  providers: [TodosApi],
})
export class Todos {
  todoApi = inject(TodosApi);
  todoList: any = [];

  ngOnInit(): void {
    this.getTodos();
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
