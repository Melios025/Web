import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SharedService } from '../../services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'melios-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  gameList: any[] = []
  currentPage = 1; // Trang hiện tại
  itemsPerPage = 8; // Số sản phẩm mỗi trang

  constructor(private gamesService: GamesService, private route: ActivatedRoute, private cartServ: CartService, private userId: SharedService) {
    this.route.paramMap.subscribe(params => this.getAllProducts())
  }
  ngOnInit(): void {

    this.getAllProducts();
  }
  getAllProducts = () => {

    this.gamesService.getAllProducts().subscribe(data => {
      this.gameList = data;
    })
  }
  get paginatedList() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.gameList.slice(start, end);
  }
  get totalPages() {
    return Math.ceil(this.gameList.length / this.itemsPerPage);
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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

}
