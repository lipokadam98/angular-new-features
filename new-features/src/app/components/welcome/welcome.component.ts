import {Component, OnInit, signal} from '@angular/core';
import {UserComponent} from "../user/user.component";
import {User} from "../../models/user";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    UserComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {

  users = signal<User[]>([]);

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.users.update(user => [
        ...user,
        {
          id: i,
          name: 'Jane Doe',
          age: 26,
        }
      ])
    }

  }

}
