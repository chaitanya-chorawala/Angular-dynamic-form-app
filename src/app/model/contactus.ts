export interface IContactus {
  name: string;
  mobileNo: string;
  email: string;
  message: string;
}

export interface IContactusResult {
  id: string;
  data: IMainPerson;
  isCollapsed?: boolean;
}

export interface IPerson {
  name: string;
  occupation: string;
  occupationDetail: string;
  dob: string;
  age: string;
  isMarried: string;
}

export interface IMainPerson extends IPerson {
  area: string;
  address: string;
  mobileNo: string;
  family: IMember[];
  createdAtDateTime: string;
  createdAt: string;
}
export interface IMember extends IPerson {
  relationWithMainPerson: string;
}

export interface IExportForms extends IPerson {
  rowNumber?: number,
  id: string,
  relationWithMainPerson: string;
  area: string;
  address: string;
  mobileNo: string;
  lastModifiedAt: string;
}

export interface IDropdown {
  key: string,
  val: string
}

export interface IRelation extends IDropdown {
  isMarried?: boolean
}
