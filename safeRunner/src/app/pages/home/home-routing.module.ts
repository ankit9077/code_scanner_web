import { CompaniesComponent } from './components/companies/companies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'company' },
    { path: 'company', component: CompaniesComponent, canActivate: [AuthGuard] },
    { path: 'company/:id', loadChildren: () => import('../modules/company-details/company-details.module').then(m => m.CompanyDetailsModule), canActivate: [AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
