import { Routes } from '@angular/router';
import {Example} from './example/example';
import {TodosList} from './todos-list/todos-list';

export const routes: Routes = [
  {path: '', component: TodosList},
  {path: 'example', component: Example}
];
