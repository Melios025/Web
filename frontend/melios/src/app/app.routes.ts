import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';

export const appRoutes: Route[] = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'products/:id', component: ProductComponent}
];
