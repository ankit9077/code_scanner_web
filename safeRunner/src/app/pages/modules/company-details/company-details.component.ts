import { CompanyService } from './../../../services/company/company.service';
import { VehicleService } from './../../../services/vehicle/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyGuid: String = '';
  isLoading = true;
  navOptions = [
    {text: 'Vehicle', value: 'vehicle'},
    {text: 'Employee', value: 'employee'}
  ];
  selectedNav ='vehicle';

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService,
     private companyService: CompanyService) { }

  ngOnInit(): void {
    this.vehicleService.vehicles = [];
    this.route.params.subscribe((params: Params) => {
      this.vehicleService.companyGuid = params.id;
    });
    if(this.vehicleService.companyGuid?.length){
      this.isLoading = true;
      this.companyService.GetCompanyById(this.vehicleService.companyGuid).then((response)=>{
        this.isLoading = false;
      },(err)=>{
        this.isLoading = false;
      })
    }
  }

}
