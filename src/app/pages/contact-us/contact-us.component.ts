import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { IMainPerson, IMember } from '../../model/contactus';
import { ContactusService } from '../../services/contactus.service';
import {
  areaValues,
  formatDateToDDMMYYYYHHMMSSFFF,
  formatDateToLocale,
  getAge,
  occupationValues,
  relationValues,
} from '../../shared/utilities';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  formId?: string | null;
  formStatus: string = 'ADD';
  subs: Subscription = new Subscription();

  relationValues = relationValues;
  unMarriedRelationValues = relationValues
    .filter((x) => !x.isMarried)
    .map((x) => x.key);
  occupationValues = occupationValues;
  areaValues = areaValues;

  constructor(
    private fb: FormBuilder,
    private contactusService: ContactusService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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

  SetMemberPersonDOB($event: any, index: number) {
    this.getMemberPersonControl('age', index).setValue(
      getAge($event.target.value)
    );
  }

  MainPersonOccupationChange($event: any) {
    if (
      this.getMainPersonControl('occupation').value !== 'STUDENT' ||
      this.getMainPersonControl('occupation').value !== 'OTHER'
    ) {
      this.getMainPersonControl('occupationDetail').setValue('');
    }
  }

  MemberPersonOccupationChange($event: any, index: number) {
    if (
      this.getMemberPersonControl('occupation', index).value !== 'STUDENT' ||
      this.getMainPersonControl('occupation').value !== 'OTHER'
    ) {
      this.getMemberPersonControl('occupationDetail', index).setValue('');
    }
  }

  ngOnInit(): void {
    this.subs.add(
      this.activatedRoute.paramMap
        .pipe(
          switchMap((param) => {
            this.formId = param.get('id');
            return this.formId
              ? this.contactusService.loadById(this.formId)
              : of(undefined);
          })
        )
        .subscribe((res) => this.createContactForm(res))
    );
  }

  createContactForm(res?: IMainPerson): void {
    this.contactForm = this.fb.group({
      name: [res?.name || '', Validators.required],
      gender: [res?.gender || '', Validators.required],
      isMarried: [res?.isMarried || '', Validators.required],
      occupation: [res?.occupation || '', Validators.required],
      occupationDetail: [res?.occupationDetail || ''],
      dob: [res?.dob || '', Validators.required],
      age: [
        res?.age || '',
        [Validators.required, Validators.min(0), Validators.max(200)],
      ],
      mobileNo: [
        res?.mobileNo || '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      area: [res?.area || '', [Validators.required]],
      address: [res?.address || '', [Validators.required]],
      family: this.fb.array([]),
      createdAt: '',
      createdAtDateTime: '',
    });

    if (res) {
      this.formStatus = 'EDIT';
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
      gender: [res?.gender || '', Validators.required],
      isMarried: [res?.isMarried || ''],
      occupation: [res?.occupation || '', Validators.required],
      occupationDetail: [res?.occupationDetail || ''],
      dob: [res?.dob || ''],
      age: [res?.age || '', [Validators.min(0), Validators.max(200)]],
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
    const data = this.contactForm.getRawValue() as IMainPerson;
    data.createdAt = formatDateToDDMMYYYYHHMMSSFFF();
    data.createdAtDateTime = formatDateToLocale();

    if (this.formId) {
      this.subs.add(
        this.contactusService.update(data, this.formId).subscribe({
          next: (val) => {
            this.toastr.success('Form submitted!', 'Success');
            this.doReset();
          },
          error: (err) => this.toastr.error(err, 'Error'),
        })
      );
    } else {
      this.subs.add(
        this.contactusService.add(data).subscribe({
          next: (val) => {
            this.toastr.success('Form submitted!', 'Success');
            this.doReset();
          },
          error: (err) => this.toastr.error(err, 'Error'),
        })
      );
    }
  }

  doReset() {
    this.formId = undefined;
    this.contactForm.reset({
      gender: '',
      isMarried: '',
      occupation: '',
      area: '',
    });
    this.personArray().clear();

    if (this.formStatus === 'EDIT') {
      this.router.navigateByUrl('/admin/forms');
    }
  }

  resetForm() {
    if (confirm('Are you sure to clear?')) {
      this.doReset();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
