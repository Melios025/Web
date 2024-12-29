import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SharedService } from '../../services/share.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SendmailService } from '../../services/sendmail.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  product: any[] = []
  constructor(private api: CartService, private sharedService: SharedService, private sendMail: SendmailService, private router: Router) {

  }
  getCart = () => {
    const userId = this.sharedService.getUserId();
    if (userId === null || userId === undefined) {
      return; // Ngừng thực hiện API nếu không có userId hợp lệ
    }
    this.api.getCart(userId).subscribe(
      data => {
        this.product = data as any[]
      },
      error => {
        console.log(error)
      }
    )
  }
  get originalPrice(): number {
    return this.product.reduce((total, item) => total + item.game_price * item.quantity, 0);
  }
  get finalPrice(): number {
    return this.product.reduce((total, item) => total + item.game_final_price * item.quantity, 0);
  }
  get savings(): number {
    return this.originalPrice - this.finalPrice;
  }
  ngOnInit(): void {
    this.getCart()
  }

  checkout(form: { value: any }) {
    const data = form.value;
    let game_id = this.product.map(item => item.PID);
    let cart_id = this.product.map(item => item.id)
    if (data.name && data.email && data.phone) {
      this.sendMail.sendMail(data.email, game_id).subscribe(
        response => {
          Swal.fire({
            title: 'Success',
            text: 'Email sent successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            for (var id of cart_id) {
              this.api.deleteCart(id).subscribe(
                response =>{
                  
                },
                err =>{

                }
              )
            }
            this.router.navigate([''])
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
