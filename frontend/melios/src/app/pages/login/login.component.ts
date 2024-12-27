import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/share.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

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
    if (data.username && data.password) {
      this.authServ.login(data.username, data.password).subscribe(
        response => {
          if (response.hasOwnProperty('user')) {
            Swal.fire({
              title: 'Success',
              text: 'Login successed',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate([''])
            })
            let currentUser = new User(response.user)
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.shServ.currentUserSubject.next(currentUser);
            Swal.fire({
              title: 'Success',
              text: 'Login successed',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate([''])
            })
            
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
