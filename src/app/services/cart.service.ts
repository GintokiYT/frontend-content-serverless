import { computed, Injectable, signal } from '@angular/core';
import { Book } from '../types';

export interface CartItem {
  book: Book
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = signal<CartItem[]>([])

  totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0))

  totalPrice = computed(() => this.items().reduce((total, item) => total + item.book.price * item.quantity, 0))

  addToCart(book: Book): void {
    const items = this.items()
    const existingItem = items.find((item) => item.book.id === book.id)

    if (existingItem) {
      this.items.update((items) =>
        items.map((item) => (item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      this.items.update((items) => [...items, { book, quantity: 1 }])
    }
  }

  removeFromCart(bookId: Book['id']): void {
    this.items.update((items) => items.filter((item) => item.book.id !== bookId))
  }

  updateQuantity(bookId: Book['id'], quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(bookId)
      return
    }

    this.items.update((items) => items.map((item) => (item.book.id === bookId ? { ...item, quantity } : item)))
  }

  clearCart(): void {
    this.items.set([])
  }
}
