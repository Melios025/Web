import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SharedService } from '../../services/share.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  product: any[] = []
  constructor(private api: CartService, private sharedService: SharedService) {
    this.getCart()
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
    
  }
  checkout(form: { value: any }) {
    const data = form.value;
      if (data.name && data.email && data.phone) {
        console.log('Form submitted successfully:', form.value);
      }
    }
}
