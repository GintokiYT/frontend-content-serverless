import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../types';
import { CommonModule } from '@angular/common';
import { ToFixedPipe } from '../../pipe/to-fixed.pipe';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    ToFixedPipe
  ],
  templateUrl: './book-card.component.html'
})
export class BookCardComponent {

  @Input() book!: Book
  @Output() edit = new EventEmitter<Book>()
  @Output() delete = new EventEmitter<Book['id']>()
  @Output() addToCart = new EventEmitter<Book>()

  onEdit(): void {
    this.edit.emit(this.book)
  }

  onDelete(): void {
    this.delete.emit(this.book.id)
  }

  onAddToCart(): void {
    this.addToCart.emit(this.book)
  }

}
