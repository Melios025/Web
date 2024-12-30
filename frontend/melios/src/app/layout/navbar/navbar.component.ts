import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'melios-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentUser: any = null
  categoryList: any[] = []
  constructor(private authService: AuthenticationService, private router: Router, private gamesService: GamesService) { }
  ngOnInit(): void {
    this.getCategory()
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    this.authService.shServ.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    })

  }
  logout():void{
    console.log('Logout clicked');
    this.authService.logout()
  }
  getCategory():void{
    this.gamesService.getCategory().subscribe(
      data=> {
        this.categoryList = data
      }
    )
  }
}