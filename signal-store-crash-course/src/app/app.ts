import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodosStore} from './store/todos.store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{

    store = inject(TodosStore);

    ngOnInit(){
     this.loadTodos().then(() => console.log("Todos loaded"));
    }

    async loadTodos(){
     await this.store.loadAll();
    }
}
