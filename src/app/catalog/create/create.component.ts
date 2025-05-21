import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
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

  add(){
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
      next(value) {
        console.log(value)
      },
      error(err) {
        console.log(err)
      },
    }
      
    )
  }
}
