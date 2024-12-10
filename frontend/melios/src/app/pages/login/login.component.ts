import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/share.service';
import { Router,RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authServ: AuthenticationService, public shServ: SharedService, private router: Router) { }
  ngOnInit(): void { }
  login(form: { value: User; }) {
    let data = form.value
    if (data.username && data.email && data.password) {
      this.authServ.login(data.username, data.email, data.password).subscribe(
        response => {
          if (response.hasOwnProperty('user')) {
            console.log('response', response)
            alert('Welcome, ' + data.username)
            this.router.navigate([''])

            let currentUser = new User(response.user)
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.shServ.currentUserSubject.next(currentUser);
            console.log(currentUser)
            alert('Welcome, ' + data.username);
            this.router.navigate([''])
          } else {
            alert(response.error)
          }
        },
        err => {
          console.log(err)

          console.log(err.error);
          alert('Error: ' + err.error);
        }
      )
    }
  }
}
