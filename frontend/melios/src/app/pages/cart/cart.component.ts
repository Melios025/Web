import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product'
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/share.service';
import { RouterLink } from '@angular/router';


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
  ngOnInit(): void {
    // this.add(this.products);
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
  // add(data) {
  //   this.value = data
  //   for (let j = 0; j < data.length; j++) {
  //     this.total_price += this.value[j].product_price * this.value[j].quantity;
  //   }
  // }
  // onChange($event){

  //   var index = $event.path[2].rowIndex ;

  //   this.new_quantity = $event.target.value;
  //   this.updated_id = this.products[index-1].id;

  //   this.products[index-1].quantity = this.new_quantity;

  //   this.updateQTY(this.updated_id, this.new_quantity);
  // }

  // updateQTY = (updated_id, new_quantity) => {
  //   // test cart with id
  //   this.api.updateQTY(updated_id , new_quantity).subscribe(
  //     data => {
  //       console.log(data);         
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
