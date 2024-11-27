import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'melios-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product: any; pictures: any[] = []
  constructor(private api: GameService, private route: ActivatedRoute) {
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
  ngOnInit(): void {
  }
}
