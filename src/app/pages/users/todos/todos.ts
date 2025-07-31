import { Component, inject } from "@angular/core";
import { TodosApi } from "./todos-api";

@Component({
    selector:'app-todos',
    template:`
     <div class="container mx-auto w-full max-w-3xl p-6">
    <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <thead class="bg-gray-200 text-gray-700 text-left">
        <tr>
          <th class="py-3 px-4 border-b">User ID</th>
          <th class="py-3 px-4 border-b">ID</th>
          <th class="py-3 px-4 border-b">Title</th>
          <th class="py-3 px-4 border-b">Completed</th>
        </tr>
      </thead>
      <tbody>
        @for(todo of todolist; track todo.id){
            <tr class="hover:bg-gray-50">
                <td class="py-3 px-4 border-b">{{todo.id}}</td>
          <td class="py-3 px-4 border-b">{{todo.userId}}</td>
          
          <td class="py-3 px-4 border-b">{{todo.title}}</td>
          <td class="py-3 px-4 border-b">
          @if (todo.completed) {
            <span class="text-green-500 text-xl"><i class="fa fa-check-square" aria-hidden="true"></i></span>
          }@else {
            <span class="text-red-500 text-xl"><i class="fa fa-times" aria-hidden="true"></i></span>
          }
          </td>
        </tr>
        }
      </tbody>
    </table>
  </div>
    `,
    providers:[TodosApi]
})
export class Todos{
    todoapi = inject(TodosApi);
    todolist :any =[];

    constructor(){
       this.todoapi.getTodos().subscribe({
        next: (res: any) =>{
            this.todolist = res;
        },
        error: (err) =>{
            console.log(err);
        }
       })
    }
}