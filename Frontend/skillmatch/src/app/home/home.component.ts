import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    console.log('Navigating to login page');
    this.router.navigate(['/login']);
    // Implement actual navigation logic using Router
  }
  
  navigateToSignUp() {
    console.log('Navigating to sign up page');
    this.router.navigate(['/reg-jobseeker']);
    // Implement actual navigation logic using Router
  }
  
  getStarted() {
    console.log('Getting started');
    this.router.navigate(['/skill-assessment']);
    // Implement navigation to the "Get Started" flow
  }

  navigateToHowItWorks() {
    console.log('Navigating to how it works page');
    this.router.navigate(['/about']);
    // Implement actual navigation logic using Router
  }

  navigateToGetMatched() {
    console.log('Navigating to get matched page');
    this.router.navigate(['/chatbot']);
    // Implement actual navigation logic using Router
  }

  navigateToProfile() {
    console.log('Navigating to profile page');
    this.router.navigate(['/profile']);
    // Implement actual navigation logic using Router
  }

  navigateToApply() {
    console.log('Navigating to apply page');
    this.router.navigate(['/apply']);
    // Implement actual navigation logic using Router
  }

  navigateToExploreJobs() {
    console.log('Navigating to explore job posts page');
    this.router.navigate(['/jobseeker-dashboard']);
    // Implement actual navigation logic using Router
  }
  navigateToChatbot() {
    console.log('Navigating to chatbot page');
    this.router.navigate(['/chatbot']);
    // Implement actual navigation logic using Router
  }
  navigateToCareerPaths() {
    console.log('Navigating to career paths page');
    this.router.navigate(['/career-path']);
    // Implement actual navigation logic using Router
  }

  navigateToContactUs() {
    console.log('Navigating to contact us page');
    this.router.navigate(['/contact-us']);
    // Implement actual navigation logic using Router
  }

}
