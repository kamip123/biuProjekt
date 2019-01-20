import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductListDataSource } from './product-list-datasource';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProductListDataSource;
  productType: string = "all";

  displayedColumns = ['cena', 'name', 'image', 'description', 'type'];

  changeCategory(productTypeRecived){
    this.productType = productTypeRecived;
    this.dataSource = new ProductListDataSource(this.paginator, this.sort, this.productType);
  }

  ngOnInit() {
    this.dataSource = new ProductListDataSource(this.paginator, this.sort, this.productType);
  }
}


