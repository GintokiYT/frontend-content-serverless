import { Component, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';
import { ToFixedPipe } from '../../pipe/to-fixed.pipe';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    OrderDetailsComponent,
    ToFixedPipe
  ],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  selectedOrderId = signal<number | null>(null)

  constructor(
    public orderService: OrderService,
    private router: Router,
    private api: ApiService
  ) {
    this.api.getOrders().subscribe({
      next: (orders) => {
        const formatOrders = orders.map((order) => {
          return {
            id: order.id,
            voucher_type: order.voucher_type,
            voucher_number: order.voucher_number,
            voucher_pdf: order.voucher_pdf,
            client_id: order.client_id,
            client: {
              id: order.client.id,
              doc_type: order.client.doc_type ,
              doc_number: order.client.doc_number,
              first_name: order.client.first_name,
              last_name: order.client.last_name,
              phone: order.client.phone,
              email: order.client.email,
            },
            details: order.details.map((detail: any) => {
              return {
                id: detail.id,
                price: detail.price,
                quantity: detail.quantity,
                book_id: detail.book_id,
                book: {
                  id: detail.book.id,
                  isbn: detail.book.isbn,
                  name: detail.book.name,
                  image: detail.book.image,
                  price: detail.book.price,
                  stock: detail.book.stock
                }
              }
            }),
            total: order.details.reduce((acc: number, detail: any) => {
              return acc + (Number(detail.price) * detail.quantity);
            }, 0)
          }
        });
        console.log("format: ", formatOrders);
        this.orderService.setOrders(formatOrders);
      }
    })
  }

  selectOrder(orderId: number): void {
    this.selectedOrderId.set(orderId)
  }

  getVoucherTypeName(type: string): string {
    return type === "B" ? "Boleta" : "Factura"
  }

  navigateToHome(): void {
    this.router.navigate(["/"])
  }
}
