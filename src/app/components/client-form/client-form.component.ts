import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../types';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent {

  @Output() formSubmit = new EventEmitter<Omit<Client, "id">>()
  @Output() formCancel = new EventEmitter<void>()

  clientForm: FormGroup
  docTypes = [
    { value: "D", label: "DNI" },
    { value: "R", label: "RUC" },
    { value: "X", label: "Carnet de Extranjería" },
  ]

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      doc_type: ["D", Validators.required],
      doc_number: ["", [Validators.required, Validators.maxLength(20)]],
      first_name: ["", [Validators.required, Validators.maxLength(50)]],
      last_name: ["", [Validators.required, Validators.maxLength(50)]],
      phone: ["", [Validators.required, Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
    })
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.formSubmit.emit(this.clientForm.value);
      this.clientForm.reset();
      this.clientForm.get('doc_type')?.setValue("D")
    } else {
      Object.keys(this.clientForm.controls).forEach((key) => {
        const control = this.clientForm.get(key)
        control?.markAsTouched()
      })
    }
  }

  onCancel(): void {
    this.formCancel.emit()
  }

  // Helpers para validación
  hasError(controlName: string, errorName: string): boolean {
    const control = this.clientForm.get(controlName)
    return !!(control && control.touched && control.hasError(errorName))
  }

}
