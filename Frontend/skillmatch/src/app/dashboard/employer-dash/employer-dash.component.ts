import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface Application {
  candidateName: string;
  jobTitle: string;
  matchPercentage: number;
}

@Component({
  selector: 'app-employer-dash',
  imports: [RouterModule, CommonModule],
  templateUrl: './employer-dash.component.html',
  styleUrl: './employer-dash.component.css'
})
export class EmployerDashComponent implements OnInit {
  companyName: string = 'TechCorp Inc.';
  activeJobs: number = 8;
  candidates: number = 47;
  interviewsScheduled: number = 12;
  
  recentApplications: Application[] = [
    {
      candidateName: 'John Doe',
      jobTitle: 'Senior Frontend Developer',
      matchPercentage: 92
    },
    {
      candidateName: 'Full Stack Engineer',
      jobTitle: 'Full Stack Developer',
      matchPercentage: 87
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Could load data from a service here
  }

  postJob(): void {
    this.router.navigate(['/jobposts']);
    console.log('Navigate to post job page');
    // Implementation for posting a job
  }

  searchCandidate(): void {
    alert('Search for candidates functionality is not implemented yet.');
    console.log('Navigate to candidate search page');
    // Implementation for searching candidates
  }

  openAIAssistant(): void {
    this.router.navigate(['/chatbot']);
    console.log('Open AI Assistant');
    // Implementation for opening AI assistant
  }

  viewApplication(application: Application): void {
    console.log(`Viewing application from ${application.candidateName} for ${application.jobTitle}`);
    // Implementation for viewing application details
  }

}
