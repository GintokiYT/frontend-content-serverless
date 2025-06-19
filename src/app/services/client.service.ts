import { Injectable, signal } from '@angular/core';
import { Client } from '../types';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private initialClients: Client[] = [];

  clients = signal<Client[]>(this.initialClients)

  constructor(
      public api: ApiService,
      public notificationService: NotificationService
    ) {
      this.api.getClients().subscribe({
        next: (clients) => this.clients.set(clients),
        error: (_error) => {
          this.clients.set([]);
          this.notificationService.error('Error al cargar los clientes');
        }
      })
    }

    async addClient(client: Omit<Client, "id">): Promise<Client> {
      return new Promise((resolve, reject) => {
        this.api.addClient(client).subscribe({
            next: ({ client: newClient }) => {
                this.clients.update((clients) => [...clients, newClient]);
                this.notificationService.success("Cliente agregado correctamente");
                resolve(newClient);
            },
            error: (_error) => {
                this.notificationService.error("Error al agregar el cliente");
                reject(_error);
            }
        });
    });
  }

  updateClient(id: number, updatedClient: Partial<Client>): void {
    this.clients.update((clients) =>
      clients.map((client) => (client.id === id ? { ...client, ...updatedClient } : client)),
    )
  }

  deleteClient(id: number): void {
    this.clients.update((clients) => clients.filter((client) => client.id !== id))
  }

  getClient(id: number): Client | undefined {
    return this.clients().find((client) => client.id === id)
  }

  searchClients(query: string): Client[] {
    if (!query.trim()) {
      return []
    }

    const lowercaseQuery = query.toLowerCase()
    return this.clients().filter(
      (client) =>
        client.first_name.toLowerCase().includes(lowercaseQuery) ||
        client.last_name.toLowerCase().includes(lowercaseQuery) ||
        client.doc_number.includes(lowercaseQuery) ||
        client.email.toLowerCase().includes(lowercaseQuery),
    )
  }

  private getNextId(): number {
    const clients = this.clients()
    return clients.length > 0 ? Math.max(...clients.map((client) => client.id)) + 1 : 1
  }
}
