import {Component, Input} from '@angular/core';
import {User} from "../../models/user";


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input({required: true}) user?: User;


}
