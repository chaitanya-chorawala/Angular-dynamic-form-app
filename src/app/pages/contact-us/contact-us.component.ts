import {
  AfterViewInit,
  Component,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../../services/contactus.service';
import { IMainPerson, IPerson } from '../../model/contactus';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contactusService: ContactusService
  ) {}

  personArray(): FormArray {
    return this.contactForm.get('family') as FormArray;
  }

  ngOnInit(): void {
    this.createContactForm();
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
    console.log(this.contactForm);

  }

  onSubmit() {
    const data = this.contactForm.getRawValue();
    console.log(data);
    this.contactusService.doContactUs(data);
    this.doReset();
  }

  doReset() {
    this.contactForm.reset();
      this.personArray().clear();
  }

  resetForm() {
    if (confirm('Are you sure to clear?')) {
      this.doReset();
    }
  }
}
