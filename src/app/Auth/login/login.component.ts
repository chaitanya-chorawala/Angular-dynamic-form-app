import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) this.router.navigate(['/admin']);
  }

  async onSubmit() {
    try {
      if (!this.loginForm.valid) return;
      const data = this.loginForm.getRawValue() as Login;
      await this.authService.login(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  }
}
