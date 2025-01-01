import { afterNextRender, AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
// import { initFlowbite } from 'flowbite';



@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, FontAwesomeModule],
  selector: 'melios-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements AfterViewInit, OnInit {

  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);
  private platformId = inject(PLATFORM_ID);
  constructor(private flowbiteService: FlowbiteService) {
    afterNextRender(() => {
      
    });
  }
  ngOnInit(): void {
    this.initFontAwesome();
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  
  }
  ngAfterViewInit(): void {
    // Kiểm tra môi trường để đảm bảo chỉ khởi tạo Flowbite khi chạy trên client-side
    if (typeof window !== 'undefined') {
      import('flowbite').then(({ initFlowbite }) => {
        initFlowbite();
      });
      import('tw-elements').then(({ initTWE, Carousel, Input, Ripple, classList, Collapse, Dropdown }) => {
        initTWE({ Carousel, Input, Ripple, classList, Collapse, Dropdown }, { allowReinits: true });
      });
    }
  }

  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far';
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}


