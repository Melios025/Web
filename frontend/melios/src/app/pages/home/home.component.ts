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
  userId: any = 0
  activeSlide = 0

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
    private cartServ: CartService,
    private userServ: SharedService
  ) {}

  ngOnInit(): void {
    this.userId = this.userServ.getUserId()
    if (this.userId) {
      this.recommend(this.userId)
    }
  }

  ngAfterViewInit(): void {}

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

  recommend(userId: any) {
    this.gamesService.getRecommendGames(userId).subscribe(
      data => {
        if (Array.isArray(data) && data.length === 0) {
          this.getAllProducts(); // Gọi getAllProducts nếu dữ liệu rỗng hoặc undefined
        } 
        else {
          this.gameList = data as any;
          this.gameList = this.getRandomGames(5);
          console.log('Game Recommend:', this.gameList);
        }
      }
    );
  }

  getAllProducts() {
    this.gamesService.getAllProducts().subscribe(data => {
      this.gameList = data as any;
      this.gameList = this.getRandomGames(5);
      console.log('All Products:', this.gameList);
    });
  }
}
