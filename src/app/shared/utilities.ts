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

export const areaValues: IDropdown[] = [
  {key:'SAYEDPURA', val: 'SAYEDPURA'},
  {key:'NANPURA', val: 'NANPURA'},
  {key:'UDHNA/PANDESARA', val: 'UDHNA/PANDESARA'},
  {key:'KATARGAM', val: 'KATARGAM'},
  {key:'VED ROAD', val: 'VED ROAD'},
  {key:'VARACHHA', val: 'VARACHHA'},
  {key:'MOTA VARACHHA', val: 'MOTA VARACHHA'},
  {key:'SUMUL DAIRY', val: 'SUMUL DAIRY'},
  {key:'ADAJAN / PAL', val: 'ADAJAN / PAL'},
  {key:'RANDER / PALANPUR JAHANGIRPURA', val: 'RANDER / PALANPUR JAHANGIRPURA'},
  {key:'AMROLI / CHHAPRABATHA', val: 'AMROLI / CHHAPRABATHA'},
  {key:'OLPAD', val: 'OLPAD'},
  {key:'OTHER', val: 'OTHER'}
]

export const getAge = (d1: string) => {
  const d1Date: Date = new Date(d1);
  const d2 = new Date();
  const diff = d2.getTime() - d1Date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export const formatDateToDDMMYYYYHHMMSSFFF = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(now.getFullYear());
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  return `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;
}


export const formatDateToLocale = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}
