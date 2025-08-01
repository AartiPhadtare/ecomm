import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class TodosApi {
  http = inject(HttpClient);

  getTodos() {
    return this.http.get('http://localhost:3000/todos');
  }

  updateTodo(body: any) {
    return this.http.put(`http://localhost:3000/todos/${body.id}`, body);
  }

  deleteTodo(id: number) {
    return this.http.delete(`http://localhost:3000/todos/${id}`);
  }

  postTodo(body: any){
    return this.http.post('http://localhost:3000/todos/', body);
  }

  //post ya put karte hoo

  // { email: "", password:"" } {name: "", phone: "", address: "", mail:""}
}
