import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isSubmitted = true;
      console.log('Forgot password request submitted for:', this.forgotPasswordForm.value.email);
      // Here you would typically call a service to send reset instructions
      // For demonstration, we'll just show a success message
      setTimeout(() => {
        // Reset form after successful submission
        this.forgotPasswordForm.reset();
        // You might want to show a success message or redirect
      }, 1500);
    } else {
      this.markFormGroupTouched(this.forgotPasswordForm);
    }
  }
  
  backToLogin(): void {
    this.router.navigate(['/login']);
  }
  
  contactSupport(): void {
    window.location.href = 'mailto:support@skillmatch.ai';
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
