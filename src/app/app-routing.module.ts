import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarInformationIndexComponent } from './indicator/common/carInformation/car-information-index/car-information-index.component';
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { OrderIndexComponent } from './indicator/invoice/order/order-index/order-index.component';
import { PreInvoiceComponent } from './indicator/invoice/pre-invoice/pre-invoice.component';
import { AuthGuard } from './framework/_auth/auth.guard';
import { HomeComponent } from './framework/home/home.component';
import { ForbiddenComponent } from './framework/forbidden/forbidden.component';
import { LoginComponent } from './framework/login/login.component';
import { UserComponent } from './framework/user/user.component';
import { AdminComponent } from './framework/admin/admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'preinvoice', component: PreInvoiceComponent },
  { path: 'order', component: OrderIndexComponent },
  { path: 'carInformation', component: CarInformationIndexComponent },
  { path: 'freightRate', component: FreightRateIndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
