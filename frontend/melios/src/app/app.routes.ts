import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CategoryComponent } from './pages/category/category.component';
import { GamesComponent } from './pages/games/games.component';

export const appRoutes: Route[] = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'products/:id', component: ProductComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'cart',component: CartComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'category/:id',component:CategoryComponent},
    {path:'games',component:GamesComponent}
];
