import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface SkillItem {
  name: string;
  level?: string;
}

interface PositionData {
  title: string;
  timeInPosition?: string;
  years?: string;
  skills?: SkillItem[];
  salary?: string;
  estimatedTimeline?: string;
}

@Component({
  selector: 'app-career-paths',
  imports: [CommonModule],
  templateUrl: './career-paths.component.html',
  styleUrl: './career-paths.component.css'
})
export class CareerPathsComponent implements OnInit {
  careerGoal = 'Senior Data Scientist';
  
  currentPosition: PositionData = {
    title: 'Junior Data Analyst',
    timeInPosition: 'Years in Position: 1.5',
    skills: [
      { name: 'SQL', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'Excel', level: 'Expert' },
      { name: 'Tableau', level: 'Intermediate' }
    ]
  };
  
  nextPosition: PositionData = {
    title: 'Data Scientist',
    estimatedTimeline: 'Estimated Timeline: 1-2 years',
    salary: 'Avg. Salary: $95,000 - $120,000'
  };
  
  goalPosition: PositionData = {
    title: 'Senior Data Scientist',
    estimatedTimeline: 'Estimated Timeline: 3-4 years',
    salary: 'Avg. Salary: $120,000 - $160,000'
  };
  
  skillsToDevelop: SkillItem[] = [
    { name: 'ML Algorithms' },
    { name: 'Python Advanced' },
    { name: 'Statistics' },
    { name: 'Cloud Computing' }
  ];
  
  seniorRoleSkills: SkillItem[] = [
    { name: 'Deep Learning' },
    { name: 'NLP' },
    { name: 'Big Data Architecture' },
    { name: 'Team Leadership' }
  ];
  
  recommendedResources: SkillItem[] = [
    { name: 'Machine Learning A-Z (Udemy)' },
    { name: 'Google Cloud Certification' },
    { name: 'Data Learning Roadmapper (Coursera)' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Method for navigating to different sections
  navigate(section: string): void {
    console.log(`Navigating to ${section}`);
    // Implement actual navigation logic here
  }
}
