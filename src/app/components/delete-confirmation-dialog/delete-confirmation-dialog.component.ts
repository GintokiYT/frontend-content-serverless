import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-dialog.component.html'
})
export class DeleteConfirmationDialogComponent {

  @Input() isOpen = false
  @Input() bookTitle = ""
  @Output() close = new EventEmitter<void>()
  @Output() confirm = new EventEmitter<void>()

  onClose(): void {
    this.close.emit()
  }

  onConfirm(): void {
    this.confirm.emit()
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains("dialog-backdrop")) {
      this.close.emit()
    }
  }

}
