import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() isOpen = false
  @Input() title = ""
  @Output() close = new EventEmitter<void>()

  onClose(): void {
    this.close.emit()
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains("modal-backdrop")) {
      this.close.emit()
    }
  }

}
