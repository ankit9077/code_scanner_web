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
  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.vehicleService.companyGuid = params.id;
    });
  }

}
