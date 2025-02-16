import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product'
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/share.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService]
})
export class CartComponent implements OnInit {
  product: any[] = []
  value: number = 0;
  updated_id: number = -1;
  // new_quantity;
  constructor(private api: CartService, private sharedService: SharedService) {
    
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
  ngOnInit(): void {
    this.getCart()
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
 deleteCart(cart_id:number){
  this.api.deleteCart(cart_id).subscribe(
    Response =>{
      Swal.fire({
        title: 'Success',
        text: 'Item deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
    })},
    error=>{
      console.log(error)
    }
  )
 }
}
