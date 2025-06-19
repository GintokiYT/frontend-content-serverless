import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  }
];
