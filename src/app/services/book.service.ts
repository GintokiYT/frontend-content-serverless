import { Injectable, signal } from '@angular/core';
import { Book } from '../types';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private initialBooks: Book[] = [];

  books = signal<Book[]>(this.initialBooks)

  constructor(
    public api: ApiService,
    public notificationService: NotificationService
  ) {
    this.api.getBooks().subscribe({
      next: (books) => this.books.set(books),
      error: (_error) => {
        this.books.set([]);
        this.notificationService.error("Error al cargar los libros");
      }
    })
  }

  async addBook(book: Omit<Book, "id">): Promise<void> {
    this.api.addBook(book).subscribe({
      next: ({book: newBook}) => {
        this.books.update((books) => [...books, newBook]);
        this.notificationService.success("Libro agregado correctamente");
      },
      error: (_error) => {
        this.notificationService.error("Error al agregar el libro");
      }
    })
  }

  async updateBook(id: Book['id'], updatedBook: Partial<Book>): Promise<void> {
    this.api.updateBook(id, updatedBook).subscribe({
      next: ({book}) => {
        this.books.update((books) => books.map((b) => (b.id === id ? { ...b, ...book } : b)))
        this.notificationService.success("Libro actualizado correctamente");
      },
      error: (_error) => {
        this.notificationService.error("Error al actualizar el libro");
      }
    })
  }

  async deleteBook(id: Book['id']): Promise<void> {
    this.api.deleteBook(id).subscribe({
      next: () => {
        this.books.update((books) => books.filter((book) => book.id !== id))
        this.notificationService.success("Libro eliminado correctamente");
      },
      error: (error) => {
        this.notificationService.error("Error al eliminar el libro");
      }
    })
  }

  getBook(id: Book['id']): Book | undefined {
    return this.books().find((book) => book.id === id)
  }
}
