import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TestableDataSource } from './testable-datasource';

@Component({
  selector: 'testable',
  templateUrl: './testable.component.html',
  styleUrls: ['./testable.component.css']
})
export class TestableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TestableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TestableDataSource(this.paginator, this.sort);
  }
}
