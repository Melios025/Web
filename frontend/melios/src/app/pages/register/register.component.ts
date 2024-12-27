import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage: string = ''
  constructor(private authServ: AuthenticationService, private us: UserService, private router: Router) { }

  ngOnInit(): void { }
  register(form: { value: User; }) {
    let data: User = form.value
    if (data.username && data.email && data.password) {
      this.authServ.register(data.username, data.email, data.password).subscribe(
        response => {
          Swal.fire({
                        title: 'Success',
                        text: 'Register successed',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(() => {
                        this.router.navigate(['login'])
                      })
        },
        err => {
          let errStr = "";
          console.log('oppppppppppp', err.error);
          console.log(data)
          errStr = (err.error.username) ? err.error.username : err.error.email;
          alert('Error: ' + errStr);
        }
      )
    }
  }
}
