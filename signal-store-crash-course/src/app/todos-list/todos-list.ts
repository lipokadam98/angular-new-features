import {Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {TodosFilter, TodosStore} from '../store/todos.store';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'todos-list',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    MatProgressSpinner,
    NgStyle
  ],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList {

  store = inject(TodosStore);

  filter = viewChild(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();

      if(filter){
        filter.value = this.store.filter();
      }

    });
  }

  protected async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  protected async onDeleteTodo(id: string, $event: MouseEvent) {
    $event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  protected async onTodoToggled(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }

  protected onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
