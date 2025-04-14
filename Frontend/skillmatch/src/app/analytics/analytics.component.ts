import { Component, OnInit } from '@angular/core';

interface SkillData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  selectedTimeframe = 'Last 8 months';
  skillMatchPercentage = 85;
  recommendedSkill = 'TypeScript';
  matchScoreIncrease = 12;
  
  skillsData: SkillData[] = [
    { name: 'React', value: 45 },
    { name: 'Python', value: 65 },
    { name: 'ML', value: 70 },
    { name: 'UX/UI', value: 35 },
    { name: 'DevOps', value: 60 },
    { name: 'Java', value: 55 },
    { name: 'SQL', value: 25 }
  ];

  salaryData = {
    years: ['0 YOE', '1 YOE', '2 YOE', '3 YOE', '4 YOE', '5+ YOE'],
    values: ['$70k', '$85k', '$105k', '$125k', '$140k', '$170k']
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Method for navigating to different sections
  navigate(section: string): void {
    console.log(`Navigating to ${section}`);
    // Implement actual navigation logic here
  }
}
