import { Component, computed, signal } from '@angular/core';
import type { Book } from '../../types';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { BookFormComponent } from '../../components/book-form/book-form.component';
import { SidePanelComponent } from '../../components/side-panel/side-panel.component';
import { CartComponent } from '../../components/cart/cart.component';
import { DeleteConfirmationDialogComponent } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    BookCardComponent,
    ModalComponent,
    BookFormComponent,
    SidePanelComponent,
    CartComponent,
    DeleteConfirmationDialogComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  isCreateModalOpen = signal(false)
  isEditModalOpen = signal(false)
  isCartOpen = signal(false)
  selectedBookId = signal<number | null>(null)
  searchQuery = signal("")

  // Estado para el diálogo de confirmación de eliminación
  isDeleteDialogOpen = signal(false)
  bookToDelete = signal<{ id: number; name: string } | null>(null)

  filteredBooks = computed(() => {
    const query = this.searchQuery().toLowerCase()
    const books = this.bookService.books()

    if (!query.trim()) {
      return books
    }

    return books.filter((book) => book.name.toLowerCase().includes(query) || book.isbn.toLowerCase().includes(query))
  })

  constructor(
    public bookService: BookService,
    public cartService: CartService,
  ) {}

  handleSearch(query: string): void {
    this.searchQuery.set(query)
  }

  handleEditBook(book: Book): void {
    this.selectedBookId.set(book.id)
    this.isEditModalOpen.set(true)
  }

  handleUpdateBook(bookData: Omit<Book, "id">): void {
    const id = this.selectedBookId()
    if (id) {
      this.bookService.updateBook(id, bookData)
      this.isEditModalOpen.set(false)
      this.selectedBookId.set(null)
    }
  }

  handleCreateBook(bookData: Omit<Book, "id">): void {
    this.bookService.addBook(bookData)
    this.isCreateModalOpen.set(false)
  }

  // Abrir diálogo de confirmación para eliminar
  handleDeleteBook(id: Book['id']): void {
    const book = this.bookService.getBook(id)
    if (book) {
      this.bookToDelete.set({ id: book.id, name: book.name })
      this.isDeleteDialogOpen.set(true)
    }
  }

  // Confirmar eliminación
  confirmDelete(): void {
    const book = this.bookToDelete()
    if (book) {
      this.bookService.deleteBook(book.id)
      this.isDeleteDialogOpen.set(false)
      this.bookToDelete.set(null)
    }
  }

  get selectedBook(): Book | undefined {
    const id = this.selectedBookId()
    return id ? this.bookService.getBook(id) : undefined
  }
}
