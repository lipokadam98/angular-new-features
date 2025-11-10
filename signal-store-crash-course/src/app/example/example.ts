import {Component, signal} from '@angular/core';
import {Child} from '../child/child';

@Component({
  selector: 'example',
  imports: [
    Child
  ],
  templateUrl: './example.html',
  styleUrl: './example.scss',
})
export class Example {

  counter = signal(0);

  counterWithoutSignal = 0;


  add =() => {
    //this.counter.update(num => num + 1);
    this.counterWithoutSignal += 1;
  }

  subtract =() => {
    //this.counter.update(num => num - 1);
    this.counterWithoutSignal -= 1;
  }
}
