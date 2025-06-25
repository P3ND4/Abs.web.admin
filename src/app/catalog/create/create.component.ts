import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { ApiServiceService } from '../../services/api-service.service';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../model/Product';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatDialogModule, CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  readonly dialogRef = inject(MatDialogRef<CreateComponent>);
  creationForm: FormGroup
  selectedFile: File | null = null
  previewUrl: string | null = null;
  constructor(private api: ApiServiceService, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {

    this.creationForm = this.fb.group({
      description: ['', [Validators.required]],
      id: ['', [Validators.required]],
      category: [null, [Validators.required]],
      price: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  onFileSelected(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader()
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile); // ¡convierte la imagen a base64!
    }
  }

  add() {
    var formData = new FormData()
    formData.append('id', this.creationForm.get('id')?.value)
    formData.append('description', this.creationForm.get('description')?.value)
    formData.append('category', this.creationForm.get('category')?.value)
    formData.append('price', this.creationForm.get('price')?.value);
    formData.append('cost', this.creationForm.get('cost')?.value);
    formData.append('unit', this.creationForm.get('unit')?.value);
    formData.append('stock', this.creationForm.get('stock')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.api.createProduct(formData).subscribe({
      next: (value) => {
        console.log(value)
        this.dialogRef.close()
      },
      error: (err) => {
        console.log(err)
      },
    });
  }
}
