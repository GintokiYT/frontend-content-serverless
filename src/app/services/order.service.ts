import { Injectable, signal } from '@angular/core';
import { Order } from '../types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private initialOrders: Order[] = []
  orders = signal<Order[]>(this.initialOrders)

  setOrders(orders: Order[]) {
    this.orders.set(orders);
  }

  getOrders(): Order[] {
    return this.orders()
  }

  getOrder(id: number): Order | undefined {
    return this.orders().find((order) => order.id === id)
  }
}
