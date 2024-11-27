import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FaConfig,
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './layout/footer/footer.component';
import { FlowbiteService } from './services/flowbite.service';


@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, FaIconComponent, NgClass, FontAwesomeModule],
  selector: 'melios-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit {

  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);
  private platformId = inject(PLATFORM_ID);
constructor(private flowbiteService: FlowbiteService){}
  ngOnInit(): void {
    this.initFontAwesome();
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
    });
    if(!(typeof document === "undefined")) {
      import('tw-elements').then(({ initTWE, Carousel }) => {
        initTWE({ Carousel }, { allowReinits: true });
      });
    }
  }

  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far';
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}

