import { OeeService } from '../oee.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IOee } from '../oee';

// TODO: replace this with real data from your application
// let EXAMPLE_DATA: IOee[] = [
//   {oeeid: 1, oeename: 'Hydrogen'},
//   {oeeid: 2, oeename: 'Helium'},
//   {oeeid: 3, oeename: 'Lithium'},
//   {oeeid: 4, oeename: 'Beryllium'},
//   {oeeid: 5, oeename: 'Boron'},
//   {oeeid: 6, oeename: 'Carbon'},
//   {oeeid: 7, oeename: 'Nitrogen'},
//   {oeeid: 8, oeename: 'Oxygen'},
//   {oeeid: 9, oeename: 'Fluorine'},
//   {oeeid: 10, oeename: 'Neon'},
//   {oeeid: 11, oeename: 'Sodium'},
//   {oeeid: 12, oeename: 'Magnesium'},
//   {oeeid: 13, oeename: 'Aluminum'},
//   {oeeid: 14, oeename: 'Silicon'},
//   {oeeid: 15, oeename: 'Phosphorus'},
//   {oeeid: 16, oeename: 'Sulfur'},
//   {oeeid: 17, oeename: 'Chlorine'},
//   {oeeid: 18, oeename: 'Argon'},
//   {oeeid: 19, oeename: 'Potassium'},
//   {oeeid: 20, oeename: 'Calcium'},
// ];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<IOee> {
  data: IOee[] = [];
  errorMessage: string;

  constructor(private paginator: MatPaginator, private sort: MatSort, 
      private oeeService: OeeService) {
    super();
  }

  ngOnInit(): void {
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IOee[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.  

    /**Initailize Data */
    this.oeeService.getOees()
    .subscribe(response => this.data = response)
    error => this.errorMessage = <any>error;
    
    const dataMutations = [
      this.oeeService.getOees(),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  private getPagedData(data: IOee[]) {

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IOee[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'oeename': return compare(a.oeename, b.oeename, isAsc);
        case 'oeeid': return compare(+a.oeeid, +b.oeeid, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
