import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {

  gameList: any[] = []
  allGameList: any[] = []
  userId: any = 0
  activeSlide = 0
  currentPage = 1;
  itemsPerPage = 8
  isLoading: boolean = true;

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
    private cartServ: CartService,
    private userServ: SharedService,
    
  ) { }

  ngOnInit(): void {
    this.getAllProductsGameList()
    this.userId = this.userServ.getUserId()
    if (this.userId) {
      this.recommend(this.userId)
    }
    
  }

  ngAfterViewInit(): void { }

  getRandomGames(n: number): any[] {
    let result = [];
    const tempList = [...this.gameList]; // Tạo một bản sao của gameList để không làm thay đổi dữ liệu gốc
    for (let i = 0; i < n && tempList.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempList.length);
      result.push(tempList[randomIndex]);
      tempList.splice(randomIndex, 1); // Loại bỏ phần tử đã chọn để không bị trùng lặp
    }
    return result;
  }
  getRandomGamesAll(n: number): any[] {
    let result = [];
    const tempList = [...this.allGameList]; // Tạo một bản sao của gameList để không làm thay đổi dữ liệu gốc
    for (let i = 0; i < n && tempList.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempList.length);
      result.push(tempList[randomIndex]);
      tempList.splice(randomIndex, 1); // Loại bỏ phần tử đã chọn để không bị trùng lặp
    }
    return result;
  }

  recommend(userId: any) {
    this.gamesService.getRecommendGames(userId).subscribe(
      data => {
        if (Array.isArray(data) && data.length === 0) {
          this.getAllProducts();
          console.log('Game All'); // Gọi getAllProducts nếu dữ liệu rỗng hoặc undefined
        }
        else {
          this.gameList = data as any;
          this.gameList = this.getRandomGames(5);
          console.log('Game Recommend');
        }
      }
    );
  }

  getAllProducts() {
    this.gamesService.getAllProducts().subscribe(data => {
      this.gameList = data as any;
      this.gameList = this.getRandomGames(5);
    });
  }
  getAllProductsGameList() {
    this.gamesService.getAllProducts().subscribe(data => {
      this.allGameList = data as any;
      this.allGameList = this.getRandomGamesAll(8)
      this.isLoading = false;
    });
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
  onAddToCart(PID: number) {
    const UID = this.userServ.getUserId()
    if (UID != null) {
      this.AddCart(PID, UID)
    } else {
      alert('Please log in')
    }
  }
}
