import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './client-search.component.html'
})
export class ClientSearchComponent {

  @Output() selectClient = new EventEmitter<Client>()
  @Output() createNewClient = new EventEmitter<void>()

  searchQuery = signal("")
  searchResults = signal<Client[]>([])
  isSearching = signal(false)

  constructor(private clientService: ClientService) {}

  onSearch(): void {
    const query = this.searchQuery()
    if (query.length >= 2) {
      this.isSearching.set(true)
      const results = this.clientService.searchClients(query)
      this.searchResults.set(results)
    } else {
      this.searchResults.set([])
    }
  }

  onSelectClient(client: Client): void {
    this.selectClient.emit(client)
    this.searchQuery.set("")
    this.searchResults.set([])
  }

  onCreateNewClient(): void {
    this.createNewClient.emit()
    this.searchQuery.set("")
    this.searchResults.set([])
  }

}
