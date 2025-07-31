import { Component, inject } from "@angular/core";
import { PostsApi } from "./posts-api";

@Component({
    selector:'app-posts',
    template:`
    <div class="container mx-auto w-full">
    <div class="grid grid-cols-4 gap-5 mx-auto p-4">  
    @for (post of posts; track post.id) {
          <div class="max-w-md bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ post.title }}</h2>
      <p class="text-gray-600 leading-relaxed">{{ post.body }}</p>
      <div class="mt-4 text-sm text-gray-500">
        <span>User ID: {{ post.userId }}</span> | <span>Post ID: {{ post.id }}</span>
      </div>
    </div>
  </div>
    }
</div>
    </div>

    `,
providers:[PostsApi]
})
export class Posts{
    postApi = inject(PostsApi);
    posts: any = [];

    constructor(){
        this.postApi.getPosts().subscribe({
            next:(res: any) =>{
                this.posts = res;
            },
            error:(err) =>{
                console.log(err);
            }
        })
    }
}