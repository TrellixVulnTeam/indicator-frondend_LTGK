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
import { OrderEditableComponent } from './indicator/invoice/order/order-editable/order-editable.component';
import { OrderIndexComponent } from './indicator/invoice/order/order-index/order-index.component';
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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, PERSIAN_DATE_FORMATS } from './framework/utilities/datetimepicker/CustomDateAdapter';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    OrderEditableComponent,
    OrderIndexComponent,
    FreightRateIndexComponent,
    FreightRateEditableComponent,
    PreInvoiceComponent
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
    AgGridModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,


    { provide: DateAdapter, useClass: CustomDateAdapter ,deps: [MAT_DATE_LOCALE]    },
    { provide: MAT_DATE_LOCALE, useValue: "fa" }, // en-GB  fr
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS, deps: [MAT_DATE_LOCALE]},
      
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
