export class User {
  guid!: string;
  name!: string;
  email!: string;
  password!: string;
  createdDate!: Date;
  constructor() {}
}

export class Company {
  guid!: string;
  name!: string;
  email!: string;
  createdDate!: Date;
  employeesCount!: Number;
  trucksCount!: Number;
  constructor() {
    this.name = '';
    this.email = '';
  }
}

export class Vehicle {
  vehicleType!: Number;
  guid!: String;
  plateNumber!: String;
  name!: String;
  companyGuid!: String;
  createdDate!: Date;
  qrCodes!: Array<QrCodes>;
  constructor(){
    this.name='';
    this.plateNumber='';
  }
}

export class Employee {
  guid!: String;
  name!: String;
  email!: String;
  companyGuid!: String;
  createdDate!: Date;
  isVerified!: String;

  constructor(){
    this.name='';
    this.email='';
  }
}

export class QrCodes {
  title!: String;
  codeInfo!: String;
}
