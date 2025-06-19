import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Book, Client } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Libros
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  addBook(book: Omit<Book, "id">): Observable<any> {
    const formData = new FormData();
    formData.append('name', book.name);
    formData.append('isbn', book.isbn);
    formData.append('stock', book.stock.toString());
    formData.append('price', book.price.toString());

    if (book.image instanceof File) {
      formData.append('image', book.image);
    }

    return this.http.post(`${this.baseUrl}/books`, formData);
  }

  deleteBook(id: Book["id"]) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/books/${id}`);
  }

  updateBook(id: Book['id'], updatedBook: Partial<Book>): Observable<any> {
    const formData = new FormData();
    formData.append('name', updatedBook.name || '');
    formData.append('isbn', updatedBook.isbn || '');
    formData.append('stock', updatedBook.stock?.toString() || '');
    formData.append('price', updatedBook.price?.toString() || '');

    if (updatedBook.image instanceof File) {
      formData.append('image', updatedBook.image);
    }

    return this.http.put(`${this.baseUrl}/books/${id}`, formData);
  }

  // Clientes
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clients`);
  }

  addClient(client: Omit<Client, "id">): Observable<any> {
    return this.http.post<Client[]>(`${this.baseUrl}/clients`, client);
  }

  // Obtener ordenes
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }
}
