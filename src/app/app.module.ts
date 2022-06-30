import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { PreInvoiceIndexComponent } from './indicator/invoice/preInvoice/pre-invoice-index/pre-invoice-index.component';
import { PreInvoiceEditableComponent } from './indicator/invoice/preInvoice/pre-invoice-editable/pre-invoice-editable.component';
import { OrderEditableComponent } from './indicator/invoice/order/order-editable/order-editable.component';
import { OrderIndexComponent } from './indicator/invoice/order/order-index/order-index.component';
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { FreightRateEditableComponent } from './indicator/common/freightRate/freight-rate-editable/freight-rate-editable.component';
import { PreInvoiceComponent } from './indicator/invoice/pre-invoice/pre-invoice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    PreInvoiceIndexComponent,
    PreInvoiceEditableComponent,
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
    MaterialModule  
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
