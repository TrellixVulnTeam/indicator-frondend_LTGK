import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './framework/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './framework/_auth/auth.guard';
import { AuthInterceptor } from './framework/_auth/auth.interceptor'; 
import { PreInvoiceComponent } from './indicator/invoice/pre-invoice/pre-invoice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './framework/home/home.component';
import { AdminComponent } from './framework/admin/admin.component';
import { UserComponent } from './framework/user/user.component';
import { ForbiddenComponent } from './framework/forbidden/forbidden.component';
import { LoginComponent } from './framework/login/login.component';
import { UserService } from './framework/_services/user.service';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CarInfoComponent } from './indicator/invoice/car-info/car-info.component';
import { AgentComponent } from './indicator/invoice/agent/agent.component';
import { CustomerComponent } from './indicator/invoice/customer/customer.component';
import { OrderHdrComponent } from './indicator/invoice/order-hdr/order-hdr.component';
import { MyDialogBoxComponent } from './framework/utilities/my-dialog-box/my-dialog-box.component';
import { CustomerGridComponent } from './indicator/invoice/customer/grid/customer-grid.componnent';
import { PreInvoiceGridComponent } from './indicator/invoice/pre-invoice/grid/pre-invoice-grid.component';
import { FreightRateComponent } from './indicator/invoice/freight-rate/freight-rate.component';
import { OrderHdrGridComponent } from './indicator/invoice/order-hdr/grid/hdr/order-hdr-grid.componnent';
import { OrderItmGridComponent } from './indicator/invoice/order-hdr/grid/itm/order-itm-grid.componnent';
import { AgentGridComponent } from './indicator/invoice/agent/grid/agent-grid.componnent';
import { CarInfoGridComponent } from './indicator/invoice/car-info/grid/car-info-grid.componnent';
import { FreightRateGridComponent } from './indicator/invoice/freight-rate/grid/freight-rate-grid.componnent';
 
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent, 

    FreightRateComponent, 
    PreInvoiceComponent,
    OrderHdrComponent,
    CarInfoComponent,
    AgentComponent,
    CustomerComponent,
    MyDialogBoxComponent,

    //grids
    CustomerGridComponent,
    PreInvoiceGridComponent,
    OrderHdrGridComponent,
    OrderItmGridComponent,
    AgentGridComponent,
    CarInfoGridComponent,
    FreightRateGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,

    ReactiveFormsModule, 
    MaterialModule ,
    AgGridModule,


    NgPersianDatepickerModule,

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,

   
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
