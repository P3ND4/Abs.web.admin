import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from '../../services/api-service.service';
import { IProduct } from '../../model/Product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  imports: [MatFormFieldModule, MatDialogModule, CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  editionForm: FormGroup
  data = inject<IProduct>(MAT_DIALOG_DATA)
  constructor(private api: ApiServiceService, private fb: FormBuilder){

    this.editionForm = this.fb.group({
      description: ['', [Validators.required]],
      category: [null, [Validators.required]],
      price: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

ngOnInit(): void {
  this.editionForm.get('description')?.setValue(this.data.description)
  this.editionForm.get('category')?.setValue(this.data.category)
  this.editionForm.get('price')?.setValue(this.data.price)
  this.editionForm.get('cost')?.setValue(this.data.cost)
  this.editionForm.get('unit')?.setValue(this.data.unit)
  this.editionForm.get('stock')?.setValue(this.data.stock)
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(){
    const product: IProduct = {
      id: this.data.id,
      description: this.editionForm.get('description')?.value,
      category: this.editionForm.get('category')?.value,
      price: this.editionForm.get('price')?.value,
      cost: this.editionForm.get('cost')?.value,
      unit: this.editionForm.get('unit')?.value,
      stock: this.editionForm.get('stock')?.value,
    }
      console.log(product)
    this.api.editProduct(product).subscribe({
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