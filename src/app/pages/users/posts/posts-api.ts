import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class PostsApi{
    http = inject(HttpClient);
    getPosts(){
        return this.http.get('https://jsonplaceholder.typicode.com/posts')
    }
}