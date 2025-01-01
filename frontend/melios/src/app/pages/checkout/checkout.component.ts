import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SharedService } from '../../services/share.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SendmailService } from '../../services/sendmail.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  product: any[] = []
  constructor(private api: CartService, private sharedService: SharedService, private sendMail: SendmailService, private router: Router, private userServ: UserService) {

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
  addBoughtCat(userId: number, gameId: number) {
    this.userServ.addBoughtCat(userId, gameId).subscribe(
      response => {
        console.log(response)
      }
    )
  }
  checkout(form: { value: any }) {
    const data = form.value;
    const userId = this.sharedService.getUserId() as number;
    let game_ids = this.product.map(item => item.PID); // Thay đổi tên biến để tránh xung đột
    let cart_ids = this.product.map(item => item.id); // Cũng thay đổi tên biến

    if (data.name && data.email && data.phone) {
      this.sendMail.sendMail(data.email, game_ids).subscribe(
        response => {
          Swal.fire({
            title: 'Success',
            text: 'Email sent successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Sử dụng game_ids đã định nghĩa
            for (var game of game_ids) {
              this.addBoughtCat(userId, game);
            }
            // Sử dụng cart_ids đã định nghĩa
            for (var id of cart_ids) {
              this.api.deleteCart(id).subscribe(
                response => {
                  // xử lý nếu cần
                },
                err => {
                  // xử lý lỗi nếu cần
                }
              );
            }
            this.router.navigate(['']);
          });
        },
        err => {
          let errStr = "";
          console.log('oppppppppppp', err.error);
          console.log(data);
          errStr = (err.error.username) ? err.error.username : err.error.email;
          alert('Error: ' + errStr);
        }
      );
    }
  }

}
