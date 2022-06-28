import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { CarInformationIndexComponent } from './indicator/common/carInformation/car-information-index/car-information-index.component';
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { OrderIndexComponent } from './indicator/invoice/order/order-index/order-index.component';
import { PreInvoiceIndexComponent } from './indicator/invoice/preInvoice/pre-invoice-index/pre-invoice-index.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'preInvoice/index', component: PreInvoiceIndexComponent },
  { path: 'order/index', component: OrderIndexComponent },
  { path: 'carInformation/index', component: CarInformationIndexComponent },
  { path: 'freightRate/index', component: FreightRateIndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
