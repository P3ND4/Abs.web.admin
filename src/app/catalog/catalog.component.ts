import { Component, OnInit } from '@angular/core';
import { IProduct } from '../model/Product';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiServiceService } from '../services/api-service.service';



@Component({
  selector: 'app-catalog',
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<IProduct>([]);
  selection = new SelectionModel<IProduct>(true, []);

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


}

