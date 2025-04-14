import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reg-employer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reg-employer.component.html',
  styleUrl: './reg-employer.component.css'
})
export class RegEmployerComponent implements OnInit {


  signupForm!: FormGroup;
  userType: 'jobSeeker' | 'employer' = 'employer';

  // Industry options
  industries: string[] = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Construction',
    'Transportation',
    'Media',
    'Other'
  ];

  // Company size options
  companySizes: string[] = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      companyName: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      businessEmail: ['', [Validators.required, Validators.email]],
      companySize: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  setUserType(type: 'jobSeeker' | 'employer'): void {
    this.userType = type;
    if (type === 'jobSeeker') {
      // Navigate to job seeker signup
      this.router.navigate(['/reg-jobseeker']);
      console.log('Navigating to job seeker signup');
    }
  }


    onSubmit(): void {
      if(this.signupForm.valid) {
      // Handle form submission
      console.log('Form submitted', {
        ...this.signupForm.value,
        userType: this.userType
      });

      // Here you would typically call your auth service
      // this.authService.registerEmployer(this.signupForm.value)

      // For demo purposes, just navigate to home
      // this.router.navigate(['/employer/dashboard']);
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  navigateToLogin(): void {
    // Navigate to login page
    console.log('Navigating to login');
    this.router.navigate(['/login']);
  }

}
