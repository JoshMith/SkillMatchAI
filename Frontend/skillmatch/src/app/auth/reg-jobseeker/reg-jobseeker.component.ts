import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-jobseeker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reg-jobseeker.component.html',
  styleUrl: './reg-jobseeker.component.css'
})
export class RegJobseekerComponent implements OnInit{

  signupForm!: FormGroup;
  userType: 'jobSeeker' | 'employer' = 'jobSeeker';
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      location: [''],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }
  
  setUserType(type: 'jobSeeker' | 'employer'): void {
    this.userType = type;
    if (type === 'employer') {
      this.navigateToEmployer();
      console.log('Navigating to employer signup');
    } 
  }
    onSubmit(): void {
    if (this.signupForm.valid) {
      // Handle form submission with user type
      console.log('Form submitted', {
        ...this.signupForm.value,
        userType: this.userType
      });
      
      // Here you would typically call your auth service
      // this.authService.register({ ...this.signupForm.value, userType: this.userType })
      
      // For demo purposes, just navigate to home
      this.router.navigate(['/']);
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  navigateToEmployer(): void {
    // Navigate to employer signup page
    console.log('Navigating to employer signup');
    this.router.navigate(['/reg-employer']);
  }
  
  
  navigateToLogin(): void {
    // Navigate to login page
    console.log('Navigating to login');
    this.router.navigate(['/login']);
  }

}
