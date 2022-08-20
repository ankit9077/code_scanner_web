import { ConfirmationBoxComponent } from './../../../../shared-module/components/confirmation-box/confirmation-box.component';
import { PAGE_SIZE } from './../../../../../assets/constants';
import { CompanyEditorComponent } from './company-editor/company-editor.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Company } from './../../../../../assets/models';
import { CompanyService } from './../../../../services/company/company.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  isloading = false;
  get Companies(): Array<Company>{
    return this.companyService.companies;
  }
  pageIndex = 0;
  totalCount = 0;
  searchText = '';

  constructor(private companyService: CompanyService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.GetCompanyList();
  }

  GetCompanyList(){
    this.isloading = true;
    this.companyService.GetCompanyList(this.pageIndex, PAGE_SIZE, this.searchText).then((response)=>{
      this.totalCount = response.totalCount;
      this.isloading = false;
    },(err)=>{
      this.isloading = false;
    });
  }

  onIndexChange(value: number){
    this.pageIndex = value;
    this.GetCompanyList();
  }

  onSearched(){
  this.pageIndex = 0;
  this.GetCompanyList();
  }

  OpenCompanyDetails(id: String) {
    this.router.navigate([`home/company/${id}`]);
  }

  AddNewOrganization() {
    const companyEditorInstance = this.matDialog.open(CompanyEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    companyEditorInstance.componentInstance.isEditMode = false;
    companyEditorInstance.afterClosed().subscribe((res)=>{
      if(res){
        this.companyService.companies.unshift(res);
      }
    });
  }

  EditOrganization(company: Company, index: number) {
    const companyEditorInstance = this.matDialog.open(CompanyEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    companyEditorInstance.componentInstance.isEditMode = true;
    companyEditorInstance.componentInstance.company = JSON.parse(JSON.stringify(company));
    companyEditorInstance.afterClosed().subscribe((res)=>{
      if(res) {
        this.companyService.companies[index] = res;
      }
    });
  }

  OpenConfirmBoxForDelete(company: Company, index: number){
    const confirmationBoxInstance = this.matDialog.open(ConfirmationBoxComponent, {
      height: '200px',
      width: '400px',
    });
    confirmationBoxInstance.componentInstance.alertConfig={
      header:`Delete Company`,
      title:`Are you sure you want to delete "${company.name}"?`,
      warning:``,
      buttons:{confirm:'Delete',cancel:'Cancel'}
    };
    confirmationBoxInstance.beforeClosed().subscribe((res)=>{
      if(res){
        this.isloading = true;
        this.companyService.DeleteCompanyById(company.guid).then((res)=>{
          this.isloading = false;
          if(this.companyService.companies.length>=1){
            this.companyService.companies.splice(index,1);
            this.totalCount--;
          }
          if(this.companyService.companies.length===0 && this.totalCount>0){
            this.pageIndex = 0;
            this.GetCompanyList();
          }
        },(err)=>{
          this.isloading = false;
        });
      }
    })
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

}
