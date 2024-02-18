import { IDropdown, IRelation } from './../model/contactus';
export const relationValues: IRelation[] = [
  {key: 'Wife', val: 'Wife', isMarried: true},
  {key: 'Mother', val: 'Mother', isMarried: true},
  {key: 'Father', val: 'Father', isMarried: true},
  {key: 'Brother', val: 'Brother'},
  {key: 'Sister', val: 'Sister'},
  {key: 'Son', val: 'Son'},
  {key: 'Daughter', val: 'Daughter'},
  {key: 'GrandMother', val: 'GrandMother', isMarried: true},
  {key: 'GrandFather', val: 'GrandFather', isMarried: true},
  {key: 'FatherInLaw', val: 'FatherInLaw', isMarried: true},
  {key: 'MotherInLaw', val: 'MotherInLaw', isMarried: true},
];

export const occupationValues: IDropdown[] = [
  {key: 'BUSINESS', val: 'BUSINESS'},
  {key: 'JOB', val: 'JOB'},
  {key: 'STUDENT', val: 'STUDENT'},
  {key: 'OTHER', val: 'OTHER'},
];

export const getAge = (d1: string) => {
  const d1Date: Date = new Date(d1);
  const d2 = new Date();
  const diff = d2.getTime() - d1Date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
