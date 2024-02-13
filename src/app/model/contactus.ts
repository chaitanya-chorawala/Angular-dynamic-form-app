export interface IContactus {
  name: string;
  mobileNo: string;
  email: string;
  message: string;
}

export interface IContactusResult {
  id: string;
  data: IContactus;
}

export interface IMainPerson {
  name: string;
  address: string;
  mobileNo: string;
  occupation: string;
  dob: string;
  age: string;
  family: IPerson[]
}
export interface IPerson {
  name: string;
  relationWithMainPerson: string;
  occupation: string;
  dob: string;
  age: string;
}
