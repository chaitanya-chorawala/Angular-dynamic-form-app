import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { IMainPerson, IMember } from '../../model/contactus';
import { ContactusService } from '../../services/contactus.service';
import { getAge, occupationValues, relationValues } from '../../shared/utilities';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  contactForm!: FormGroup;
  formId?: string | null;

  relationValues = relationValues;
  unMarriedRelationValues = relationValues.filter(x => !x.isMarried).map(x => x.key);
  occupationValues = occupationValues;

  constructor(
    private fb: FormBuilder,
    private contactusService: ContactusService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  personArray(): FormArray {
    return this.contactForm.get('family') as FormArray;
  }

  getMainPersonControl(name: string): FormControl {
    return this.contactForm.get(name) as FormControl;
  }

  getMemberPersonControl(name: string, index: number): FormControl {
    return this.personArray().at(index).get(name) as FormControl;
  }

  SetMainPersonDOB($event: any) {
    this.getMainPersonControl('age').setValue(getAge($event.target.value));
  }

  SetMemberPersonDOB($event:any, index: number) {
    this.getMemberPersonControl('age',index).setValue(getAge($event.target.value));
  }

  MainPersonOccupationChange($event: any) {
    if(this.getMainPersonControl('occupation').value !== 'STUDENT' || this.getMainPersonControl('occupation').value !== 'OTHER')
    {this.getMainPersonControl('occupationDetail').setValue('');}
  }

  MemberPersonOccupationChange($event: any, index: number) {
    if(this.getMemberPersonControl('occupation',index).value !== 'STUDENT' || this.getMainPersonControl('occupation').value !== 'OTHER')
    {this.getMemberPersonControl('occupationDetail',index).setValue('');}
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((param) => {
          this.formId = param.get('id');
          return this.formId
            ? this.contactusService.loadById(this.formId)
            : of(undefined);
        })
      )
      .subscribe((res) => this.createContactForm(res));
  }
  ngAfterViewInit(): void {}

  createContactForm(res?: IMainPerson): void {
    this.contactForm = this.fb.group({
      name: [res?.name || '', Validators.required],
      isMarried: [res?.isMarried || '', Validators.required],
      occupation: [res?.occupation || '', Validators.required],
      occupationDetail: [res?.occupationDetail || ''],
      dob: [res?.dob || '', Validators.required],
      age: [res?.age || '', Validators.required],
      mobileNo: [res?.mobileNo || '', Validators.required],
      area: [res?.area || '', [Validators.required]],
      address: [res?.address || '', [Validators.required]],
      family: this.fb.array([]),
    });

    if (res) {
      res.family.forEach((x) => {
        this.personArray().push(this.createPerson(x));
      });
    }
  }

  createPerson(res?: IMember): FormGroup {
    return this.fb.group({
      name: [res?.name || '', Validators.required],
      relationWithMainPerson: [
        res?.relationWithMainPerson || '',
        Validators.required,
      ],
      isMarried: [res?.isMarried || ''],
      occupation: [res?.occupation || '', Validators.required],
      occupationDetail: [res?.occupationDetail || ''],
      dob: [res?.dob || ''],
      age: [res?.age || ''],
    });
  }

  addPerson(): void {
    this.personArray().push(this.createPerson());
  }

  removePerson(index: number): void {
    this.personArray().removeAt(index);
    this.contactForm.updateValueAndValidity();
  }

  onSubmit() {
    const data = this.contactForm.getRawValue();
    this.contactusService.doContactUs(data, this.formId);
    this.doReset();
  }

  doReset() {
    this.contactForm.reset();
    this.personArray().clear();
    if (this.formId) {
      this.router.navigateByUrl('/admin/forms');
    }
  }

  resetForm() {
    if (confirm('Are you sure to clear?')) {
      this.doReset();
    }
  }
}
