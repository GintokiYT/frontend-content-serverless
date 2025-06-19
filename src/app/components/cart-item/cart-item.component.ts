import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../pipe/to-fixed.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToFixedPipe
  ],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {

  @Input() book!: Book
  @Input() quantity = 1
  @Output() updateQuantity = new EventEmitter<{ bookId: Book['id']; quantity: number }>()
  @Output() remove = new EventEmitter<Book['id']>()

  onUpdateQuantity(quantity: number): void {
    this.updateQuantity.emit({ bookId: this.book.id, quantity })
  }

  onRemove(): void {
    this.remove.emit(this.book.id)
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement
    const value = Number.parseInt(input.value, 10)
    if (!isNaN(value)) {
      this.onUpdateQuantity(value)
    }
  }

}
