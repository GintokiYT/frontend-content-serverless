import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../types';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent {

  @Input() book?: Book
  @Output() formSubmit = new EventEmitter<Omit<Book, "id">>()
  @Output() formCancel = new EventEmitter<void>()

  bookForm!: FormGroup
  previewImage = ""

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()

    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      isbn: ["", Validators.required],
      name: ["", Validators.required],
      image: [""],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.bookForm.patchValue({ image: file });
      this.bookForm.get('image')!.markAsDirty();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    document.getElementById("imageFile")?.click()
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.formSubmit.emit(this.bookForm.value);
      this.bookForm.reset();
      this.previewImage = "";
      const input = document.getElementById("imageFile") as HTMLInputElement;
      if (input) {
        input.value = "";
      }
    }
  }

  onCancel(): void {
    this.formCancel.emit()
  }

}
