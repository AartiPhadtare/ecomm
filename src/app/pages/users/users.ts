import { Component, inject } from '@angular/core';
import { UserApi } from './users-api';

@Component({
  selector: 'app-users',
  template: `
    <div class="container mx-auto p-4">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-3 px-4 text-left">Id</th>
            <th class="py-3 px-4 text-left">Name</th>
            <th class="py-3 px-4 text-left">Username</th>
            <th class="py-3 px-4 text-left">Email</th>
            <th class="py-3 px-4 text-left">City</th>
            <th class="py-3 px-4 text-left">Company</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users; track user.id) {
          <tr class="border-b hover:bg-gray-100">
            <td class="py-3 px-4">{{ user.id }}</td>
            <td class="py-3 px-4">{{ user.name }}</td>
            <td class="py-3 px-4">{{ user.username }}</td>
            <td class="py-3 px-4">{{ user.email }}</td>
            <td class="py-3 px-4">{{ user.address.city }}</td>
            <td class="py-3 px-4">{{ user.company.name }}</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  providers: [UserApi],
})
export class Users {
  userApi = inject(UserApi);
  users: any = [];

  constructor() {
    this.userApi.getUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
