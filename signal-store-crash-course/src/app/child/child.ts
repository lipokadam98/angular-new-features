import {Component, Input, input, model} from '@angular/core';

@Component({
  selector: 'child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {

  someModelInput = model.required<number>();

  @Input({
    required: true
  }) originalInput = 0;

  add =() => {
    //this.counter.update(num => num + 1);
    this.someModelInput.update(num => num + 1);
  }
}
