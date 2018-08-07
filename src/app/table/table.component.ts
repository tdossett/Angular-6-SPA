import { Component, OnInit, ViewChild } from '@angular/core';
import { OeeService } from '../oee.service';
import { MatPaginator, MatSort } from '@angular/material';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['oeeid', 'oeename'];

  constructor(private oeeService: OeeService) { }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginator, this.sort, this.oeeService);
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
