import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../model/Product';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiServiceService } from '../services/api-service.service';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { error } from 'console';

@Component({
  selector: 'app-catalog',
  imports: [MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'category', 'stock'];
  dataSource = new MatTableDataSource<IProduct>([]);
  selection = new SelectionModel<IProduct>(true, []);
  readonly dialog = inject(MatDialog);




  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(
      (data: IProduct[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        this.api.getProducts().subscribe(
          (data: IProduct[]) => {
            this.dataSource.data = data;
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    })

  }
  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(

    )
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: IProduct): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isSomethingSelected(): Boolean {
    return this.selection.selected.length > 0
  }

  deleteSelected() {
    const selectedProducts = this.selection.selected;
    console.log(selectedProducts)
    for (let prod of selectedProducts) {
      this.api.deleteProduct(prod.id).subscribe(
        () => {
          // Remove the deleted product from the data source
          const index = this.dataSource.data.indexOf(prod);
          if (index >= 0) {
            this.selection.toggle(prod)
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription(); // Update the data source
          }
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }

  }


}

