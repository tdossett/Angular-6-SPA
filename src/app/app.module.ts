import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { TableComponent } from './table/table.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';

import { UserTableComponent } from './usertable.component';

import { OeeService } from './oee.service';
import { UserService } from './user.service';

import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: 'table', component: TableComponent },
  { path: 'tablepagination', component: TablePaginationComponent },
  { path: 'usertable', component: UserTableComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    TablePaginationComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [OeeService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
