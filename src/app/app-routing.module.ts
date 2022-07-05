import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreightRateIndexComponent } from './indicator/common/freightRate/freight-rate-index/freight-rate-index.component';
import { PreInvoiceComponent } from './indicator/invoice/pre-invoice/pre-invoice.component';
import { AuthGuard } from './framework/_auth/auth.guard';
import { HomeComponent } from './framework/home/home.component';
import { ForbiddenComponent } from './framework/forbidden/forbidden.component';
import { LoginComponent } from './framework/login/login.component';
import { UserComponent } from './framework/user/user.component';
import { AdminComponent } from './framework/admin/admin.component';
import { OrderComponent } from './indicator/invoice/order/order.component';
import { CarInfoComponent } from './indicator/invoice/car-info/car-info.component';
import { AgentComponent } from './indicator/invoice/agent/agent.component';
import { CustomerComponent } from './indicator/invoice/customer/customer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'preinvoice', component: PreInvoiceComponent },
  { path: 'order', component: OrderComponent },
  { path: 'carInformation', component: CarInfoComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'freightRate', component: FreightRateIndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
