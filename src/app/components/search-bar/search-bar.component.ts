import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>()
  query = ""

  onQueryChange(): void {
    this.search.emit(this.query)
  }

  clearQuery(): void {
    this.query = ""
    this.search.emit("")
  }
}
