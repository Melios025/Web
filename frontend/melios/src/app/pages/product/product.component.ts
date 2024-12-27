import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/share.service';


@Component({
  selector: 'melios-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product: any; pictures: any[] = []
  constructor(private api: GameService, private route: ActivatedRoute, private cartServ: CartService, private userId: SharedService) {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam); // Chuyển đổi từ string sang number
        if (!isNaN(id)) {
          this.getProduct(id);
        } else {
          console.error('Invalid ID:', idParam);
        }
      } else {
        console.error('ID is null');
      }
    });
  }
  changeImage(event: MouseEvent): void {
    const mainImage = document.getElementById('mainImage') as HTMLImageElement | null;
    const target = event.target as HTMLImageElement;
    const src = target.src;
    if (mainImage) {
      mainImage.src = src;
    } else {
      console.error("Element with ID 'mainImage' not found.");
    }
  }
  
  getProduct(id: number): void {
    this.api.getGameById(id).subscribe(
      data => {
        this.product = data[0]
      }
    )
    this.api.getPicturesByGameId(id).subscribe(
      data => {
        this.pictures = data
      }
    )
  }
  AddCart(PID: number, UID: number) {
      if (PID && UID) {
        this.cartServ.addCart(PID, UID).subscribe(
          response => {
            Swal.fire({
                          title: 'Success',
                          text: 'Add successed',
                          icon: 'success',
                          confirmButtonText: 'OK'
                        })
  
          },
          err => {
            let errStr = "";
            console.log('oppppppppppp', err.error);
            console.log(PID, UID)
            errStr = (err.error.PID) ? err.error.PID : err.error.UID;
            alert('Error: ' + errStr);
          }
        )
      }
    }
    onAddToCart(PID: number){
      const UID = this.userId.getUserId()
      if(UID != null){
        this.AddCart(PID, UID)
      } else{
        alert('Please log in')
      }
    }
  ngOnInit(): void {
    
  }
}
