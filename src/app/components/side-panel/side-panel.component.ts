import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './side-panel.component.html'
})
export class SidePanelComponent {

  @Input() isOpen = false

}
