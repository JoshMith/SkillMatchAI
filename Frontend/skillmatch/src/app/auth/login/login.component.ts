import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted', this.loginForm.value);
      // Handle authentication logic here
      this.router.navigate(['/dashboard']);
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }
  
  signInWithLinkedIn(): void {
    console.log('Sign in with LinkedIn');
    // Implement LinkedIn OAuth login
  }
  
  signInWithGoogle(): void {
    console.log('Sign in with Google');
    // Implement Google OAuth login
  }
  
  createAccount(): void {
    this.router.navigate(['/reg-jobseeker']);
  }
  
  forgotPassword(): void {
    this.router.navigate(['/forgot']);
  }
  
  // Helper method to mark all controls as touched to trigger validation
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
