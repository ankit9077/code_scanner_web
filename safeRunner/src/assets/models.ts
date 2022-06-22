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
}

export class Vehicle {
  vehicleType!: Number;
  guid!: String;
  plateNumber!: String;
  name!: String;
  companyGuid!: String;
  createdDate!: Date;
  qrCodes!: Array<QrCodes>
}

export class QrCodes {
  title!: String;
  codeInfo!: String;
}
