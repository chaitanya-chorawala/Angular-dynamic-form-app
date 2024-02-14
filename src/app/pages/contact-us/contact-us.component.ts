import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { IMainPerson, IPerson } from '../../model/contactus';
import { ContactusService } from '../../services/contactus.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  contactForm!: FormGroup;
  formId?: string | null;
  constructor(
    private fb: FormBuilder,
    private contactusService: ContactusService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  personArray(): FormArray {
    return this.contactForm.get('family') as FormArray;
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
      address: [res?.address || '', [Validators.required]],
      mobileNo: [res?.mobileNo || '', Validators.required],
      occupation: [res?.occupation || '', Validators.required],
      dob: [res?.dob || '', Validators.required],
      age: [res?.age || '', Validators.required],
      family: this.fb.array([]),
    });

    if (res) {
      res.family.forEach((x) => {
        this.personArray().push(this.createPerson(x));
      });
    }
  }

  createPerson(res?: IPerson): FormGroup {
    return this.fb.group({
      name: [res?.name || '', Validators.required],
      relationWithMainPerson: [
        res?.relationWithMainPerson || '',
        Validators.required,
      ],
      occupation: [res?.occupation || '', Validators.required],
      dob: [res?.dob || ''],
      age: [res?.age || '', Validators.required],
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
