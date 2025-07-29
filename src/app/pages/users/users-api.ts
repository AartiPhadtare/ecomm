import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserApi {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}
