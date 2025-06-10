import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from '../../services/api-service.service';
import { IProduct } from '../../model/Product';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  creationForm: FormGroup
  constructor(private api: ApiServiceService, private fb: FormBuilder){

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

  edit(){
    const product: IProduct = {
      id: this.creationForm.get('id')?.value,
      description: this.creationForm.get('description')?.value,
      category: this.creationForm.get('category')?.value,
      price: this.creationForm.get('price')?.value,
      cost: this.creationForm.get('cost')?.value,
      unit: this.creationForm.get('unit')?.value,
      stock: this.creationForm.get('stock')?.value,
      image: 'https://m.media-amazon.com/images/I/71j7TRsZjWL.__AC_SX300_SY300_QL70_FMwebp_.jpg',    }
      console.log(product)
    this.api.createProduct(product).subscribe({
      next: (value) => {
        console.log(value)
        this.dialogRef.close()
      },
      error: (err) => {
        console.log(err)
      },
    }
      
    )
  }
}