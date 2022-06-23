import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyDetailsComponent } from './company-details.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [{
  path: '', component: CompanyDetailsComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'vehicle' },
    { path: 'vehicle', component: VehicleComponent, canActivate: [AuthGuard] },
    { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDetailsRoutingModule { }
