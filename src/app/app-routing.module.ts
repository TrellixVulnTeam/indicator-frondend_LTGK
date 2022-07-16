import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { CarInformationDetailComponent } from './indicator/common/carInformation/car-information-detail/car-information-detail.component';
import { CarInformationEditableComponent } from './indicator/common/carInformation/car-information-editable/car-information-editable.component';
import { CarInformationIndexComponent } from './indicator/common/carInformation/car-information-index/car-information-index.component';
import { CustomerDetailComponent } from './indicator/common/customer/customer-detail/customer-detail.component';
import { CustomerEditableComponent } from './indicator/common/customer/customer-editable/customer-editable.component';
import { CustomerIndexComponent } from './indicator/common/customer/customer-index/customer-index.component';
import { FreightRateDetailComponent } from './indicator/common/freightRate/freight-rate-detail/freight-rate-detail.component';
import { FreightRateEditableComponent } from './indicator/common/freightRate/freight-rate-editable/freight-rate-editable.component';
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { ViewActions } from './indicator/enums/viewActions';
import { OrderDetailComponent } from './indicator/invoice/order/order-detail/order-detail.component';
import { OrderEditableComponent } from './indicator/invoice/order/order-editable/order-editable.component';
import { OrderIndexComponent } from './indicator/invoice/order/order-index/order-index.component';
import { PreInvoiceDetailComponent } from './indicator/invoice/preInvoice/pre-invoice-detail/pre-invoice-detail.component';
import { PreInvoiceEditableComponent } from './indicator/invoice/preInvoice/pre-invoice-editable/pre-invoice-editable.component';
import { PreInvoiceIndexComponent } from './indicator/invoice/preInvoice/pre-invoice-index/pre-invoice-index.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  //############################# PreInvoiceRoute #######################################
  { path: 'preInvoice/index', component: PreInvoiceIndexComponent },
  { path: 'preInvoice/create', component: PreInvoiceEditableComponent, data: { viewAction: ViewActions.Create } },
  { path: 'preInvoice/edit/:id', component: PreInvoiceEditableComponent, data: { viewAction: ViewActions.Edit } },
  { path: 'preInvoice/delete/:id', component: PreInvoiceDetailComponent, data: { viewAction: ViewActions.delete } },

//############################# OrderRoute #######################################
  { path: 'order/index', component: OrderIndexComponent },
  { path: 'order/create', component: OrderEditableComponent, data: { viewAction: ViewActions.Create } },
  { path: 'order/edit/:id', component: OrderEditableComponent, data: { viewAction: ViewActions.Edit } },
  { path: 'order/delete/:id', component: OrderDetailComponent, data: { viewAction: ViewActions.delete } },

  //############################# CustomerRoute #######################################
  { path: 'customer/index', component: CustomerIndexComponent },
  { path: 'customer/create', component: CustomerEditableComponent, data: { viewAction: ViewActions.Create } },
  { path: 'customer/edit/:id', component: CustomerEditableComponent, data: { viewAction: ViewActions.Edit } },
  { path: 'customer/delete/:id', component: CustomerDetailComponent, data: { viewAction: ViewActions.delete } },

  //############################# CarInformationRoute #######################################
  { path: 'carInformation/index', component: CarInformationIndexComponent },
  { path: 'carInformation/create', component: CarInformationEditableComponent, data: { viewAction: ViewActions.Create } },
  { path: 'carInformation/edit/:id', component: CarInformationEditableComponent, data: { viewAction: ViewActions.Edit } },
  { path: 'carInformation/delete/:id', component: CarInformationDetailComponent, data: { viewAction: ViewActions.delete } },

  //############################# FreightRateRoute #######################################
  { path: 'freightRate/index', component: FreightRateIndexComponent },
  { path: 'freightRate/create', component: FreightRateEditableComponent, data: { viewAction: ViewActions.Create } },
  { path: 'freightRate/edit/:id', component: FreightRateEditableComponent, data: { viewAction: ViewActions.Edit } },
  { path: 'freightRate/delete/:id', component: FreightRateDetailComponent, data: { viewAction: ViewActions.delete } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
