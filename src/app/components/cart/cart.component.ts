import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Book, Client } from '../../types';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NotificationService } from '../../services/notification.service';
import { ClientService } from '../../services/client.service';
import { ClientSearchComponent } from '../client-search/client-search.component';
import { ModalComponent } from '../modal/modal.component';
import { ToFixedPipe } from '../../pipe/to-fixed.pipe';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export type VoucherType = "B" | "F"

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    ClientFormComponent,
    ClientSearchComponent,
    ModalComponent,
    ToFixedPipe
  ],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  @Output() close = new EventEmitter<void>()
  isCheckingOut = false
  selectedClient = signal<Client | null>(null)
  isClientFormModalOpen = signal(false)
  voucherType = signal<VoucherType | null>(null)

  voucherTypes = [
    { value: "B", label: "Boleta" },
    { value: "F", label: "Factura" },
  ];

  private baseUrl = environment.apiUrl;

  constructor(
    public cartService: CartService,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private router: Router,
    private http: HttpClient
  ) {}

  async handleCheckout() {
    if (!this.selectedClient()) {
      this.notificationService.error("Debe seleccionar un cliente para continuar con la compra.")
      return
    }

    this.isCheckingOut = true

    const items = this.cartService.items()
    const client = this.selectedClient()
    const voucherType = this.voucherType()

    const orderData = {
      client: {
        id: client?.id,
        type: client?.doc_type,
        number: client?.doc_number,
        name: client?.first_name + " " + client?.last_name,
      },
      type: voucherType,
      products: items.map(item => ({
        id: item.book.id,
        name: item.book.name,
        price: Number(item.book.price).toFixed(2),
        quantity: item.quantity
      }))
    }

    console.log('Order Data:', orderData)

    this.http.post(`${this.baseUrl}/orders`, orderData).subscribe({
      next: (response) => {
        console.log(response);
      }
    });


    setTimeout(() => {
      this.notificationService.success("¡Pago procesado con éxito!")
      this.cartService.clearCart()
      this.selectedClient.set(null)
      this.isCheckingOut = false
    }, 1500)
  }

  updateItemQuantity(event: { bookId: Book["id"]; quantity: number }): void {
    this.cartService.updateQuantity(event.bookId, event.quantity)
  }

  removeItem(bookId: Book["id"]): void {
    const item = this.cartService.items().find((item) => item.book.id === bookId)
    if (item) {
      this.cartService.removeFromCart(bookId)
      this.notificationService.info(`"${item.book.name}" ha sido eliminado del carrito.`)
    }
  }

  onSelectClient(client: Client): void {
    this.selectedClient.set(client)
    this.notificationService.success(`Cliente seleccionado: ${client.first_name} ${client.last_name}`)
  }

  onCreateNewClient(): void {
    this.isClientFormModalOpen.set(true)
  }

  async handleClientFormSubmit(clientData: Omit<Client, "id">) {
    const newClient = await this.clientService.addClient(clientData)
    this.selectedClient.set(newClient)
    this.isClientFormModalOpen.set(false)
    this.notificationService.success(`Cliente creado: ${newClient.first_name} ${newClient.last_name}`)
  }

  handleClientFormCancel(): void {
    this.isClientFormModalOpen.set(false)
  }

  removeSelectedClient(): void {
    this.selectedClient.set(null)
  }

  onClose(): void {
    this.close.emit();
  }

  setVoucherType(type: string): void {
    const value = type as VoucherType;
    this.voucherType.set(value);
  }

  getVoucherTypeName(): string {
    return this.voucherType() === "B" ? "Boleta" : "Factura"
  }

  canProceedToCheckout(): boolean {
    return !!this.selectedClient() && !!this.voucherType() && !this.isCheckingOut
  }

  navigateToOrders(): void {
    this.router.navigate(["/orders"])
  }
}
