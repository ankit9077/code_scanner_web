import { SharedModule } from './../../shared-module/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyEditorComponent } from './components/companies/company-editor/company-editor.component';

@NgModule({
  declarations: [
    HomeComponent,
    CompaniesComponent,
    CompanyEditorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
