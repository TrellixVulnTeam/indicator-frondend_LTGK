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
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { PreInvoiceIndexComponent } from './indicator/invoice/preInvoice/pre-invoice-index/pre-invoice-index.component';
import { PreInvoiceEditableComponent } from './indicator/invoice/preInvoice/pre-invoice-editable/pre-invoice-editable.component';
import { OrderEditableComponent } from './indicator/invoice/order/order-editable/order-editable.component';
import { OrderIndexComponent } from './indicator/invoice/order/order-index/order-index.component';
import { CarInformationIndexComponent } from './indicator/common/carInformation/car-information-index/car-information-index.component';
import { CarInformationEditableComponent } from './indicator/common/carInformation/car-information-editable/car-information-editable.component';
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { FreightRateEditableComponent } from './indicator/common/freightRate/freight-rate-editable/freight-rate-editable.component';
import { CustomerEditableComponent } from './indicator/common/customer/customer-editable/customer-editable.component';
import { CustomerIndexComponent } from './indicator/common/customer/customer-index/customer-index.component';
import { CustomerDetailComponent } from './indicator/common/customer/customer-detail/customer-detail.component';
import { PreInvoiceDetailComponent } from './indicator/invoice/preInvoice/pre-invoice-detail/pre-invoice-detail.component';
import { CarInformationDetailComponent } from './indicator/common/carInformation/car-information-detail/car-information-detail.component';
import { FreightRateDetailComponent } from './indicator/common/freightRate/freight-rate-detail/freight-rate-detail.component';
import { OrderDetailComponent } from './indicator/invoice/order/order-detail/order-detail.component';
import { NgbAccordionModule, NgbModal, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastGlobalComponent } from './toast-global/toast-global.component';
import { ToastsContainer } from './toast-global/toast-container.component';
import { OrderModalComponent } from './indicator/modals/order-modal/order-modal.component';
import { PreInvoiceModalComponent } from './indicator/modals/pre-invoice-modal/pre-invoice-modal.component';

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
    CarInformationIndexComponent,
    CarInformationEditableComponent,
    FreightRateIndexComponent,
    FreightRateEditableComponent,
    CustomerEditableComponent,
    CustomerIndexComponent,
    CustomerDetailComponent,
    PreInvoiceDetailComponent,
    CarInformationDetailComponent,
    FreightRateDetailComponent,
    OrderDetailComponent,
    ToastGlobalComponent,
    ToastsContainer,
    OrderModalComponent,
    PreInvoiceModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbToastModule,
    NgbAccordionModule,
    NgbModule
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
