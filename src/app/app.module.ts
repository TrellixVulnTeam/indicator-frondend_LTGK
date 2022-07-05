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
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { FreightRateEditableComponent } from './indicator/common/freightRate/freight-rate-editable/freight-rate-editable.component';
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
import { OrderComponent } from './indicator/invoice/order/order.component';
import { CarInfoComponent } from './indicator/invoice/car-info/car-info.component';
import { AgentComponent } from './indicator/invoice/agent/agent.component';
import { CustomerComponent } from './indicator/invoice/customer/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent, 
    FreightRateIndexComponent,
    FreightRateEditableComponent,


    PreInvoiceComponent,
    OrderComponent,
    CarInfoComponent,
    AgentComponent,
    CustomerComponent,
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
