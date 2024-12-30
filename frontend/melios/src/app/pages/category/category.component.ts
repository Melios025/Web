import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SharedService } from '../../services/share.service';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CallTracker } from 'assert';

@Component({
  selector: 'app-category',
  imports: [RouterLink,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  category:any
  gameList: any[] = []
  currentPage = 1;
  itemsPerPage = 8
  id:number=0
constructor(private gamesApi: GamesService, private route: ActivatedRoute, private cartServ: CartService, private userId: SharedService) {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam); // Chuyển đổi từ string sang number
        if (!isNaN(id)) {
          this.id =id
        } else {
          console.error('Invalid ID:', idParam);
        }
      } else {
        console.error('ID is null');
      }
    });
  }
  ngOnInit(): void {
    this.getCategory(this.id);
    this.getGameByCategoryId(this.id)
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
  getCategory(id:number):void{
    this.gamesApi.getCategoryById(id).subscribe(
      data=> {
        this.category = data[0]
      }
    )
  }
  getGameByCategoryId(id:number):void{
    this.gamesApi.getGameByCategory(id).subscribe(
      data=>{
        this.gameList=data
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
}
