import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface Job {
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  salaryRange: string;
  skillsMatch: number;
}

@Component({
  selector: 'app-jobseeker-dash',
  imports: [RouterModule, CommonModule],
  templateUrl: './jobseeker-dash.component.html',
  styleUrl: './jobseeker-dash.component.css'
})
export class JobseekerDashComponent implements OnInit {
  username: string = 'User';
  publicStrength: number = 75;
  jobMatches: number = 12;
  activeApplications: number = 5;
  
  recommendedJobs: Job[] = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      remote: true,
      salaryRange: '$90k-$120k',
      skillsMatch: 92
    },
    {
      title: 'Full Stack Engineer',
      company: 'InnoSoft',
      location: 'San Francisco',
      salaryRange: '$110k-$140k',
      skillsMatch: 87
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Could fetch data from a service here
  }

  applyForJob(job: Job): void {
    console.log(`Applying for ${job.title} at ${job.company}`);
    // Implementation for job application logic
  }
}
