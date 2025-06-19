import { Component, Input } from '@angular/core';
import { Order } from '../../types';
import { OrderService } from '../../services/order.service';
import { ToFixedPipe } from '../../pipe/to-fixed.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    ToFixedPipe
  ],
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent {

  @Input() orderId!: number
  order: Order | undefined

  constructor(private orderService: OrderService) {}

  ngOnChanges(): void {
    this.order = this.orderService.getOrder(this.orderId)
  }

  getVoucherTypeName(type: string): string {
    return type === "B" ? "Boleta" : "Factura"
  }

}
