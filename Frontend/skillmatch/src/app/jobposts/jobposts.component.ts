import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Skill {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-jobposts',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './jobposts.component.html',
  styleUrl: './jobposts.component.css'
})
export class JobpostsComponent implements OnInit {
  jobPostingForm: FormGroup;
  availableSkills: Skill[] = [
    { name: 'React.js', selected: true },
    { name: 'Node.js', selected: true },
    { name: 'TypeScript', selected: true },
    { name: 'REST APIs', selected: true },
    { name: 'Angular', selected: false },
    { name: 'Vue.js', selected: false },
    { name: 'Python', selected: false },
    { name: 'Java', selected: false },
    { name: 'C#', selected: false },
    { name: 'SQL', selected: false },
    { name: 'MongoDB', selected: false },
    { name: 'AWS', selected: false }
  ];
  
  newSkill: string = '';
  showSkillInput: boolean = false;

  constructor(private fb: FormBuilder) {
    this.jobPostingForm = this.fb.group({
      jobTitle: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
      salaryRange: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  toggleSkill(skill: Skill): void {
    skill.selected = !skill.selected;
  }

  addNewSkill(): void {
    if (this.newSkill.trim() !== '' && !this.availableSkills.some(s => s.name.toLowerCase() === this.newSkill.toLowerCase())) {
      this.availableSkills.push({ name: this.newSkill, selected: true });
      this.newSkill = '';
      this.showSkillInput = false;
    }
  }

  showAddSkillInput(): void {
    this.showSkillInput = true;
    setTimeout(() => {
      document.getElementById('newSkillInput')?.focus();
    }, 0);
  }

  cancelAddSkill(): void {
    this.newSkill = '';
    this.showSkillInput = false;
  }

  getSelectedSkills(): Skill[] {
    return this.availableSkills.filter(skill => skill.selected);
  }

  createJobPosting(): void {
    if (this.jobPostingForm.valid) {
      const formData = {
        ...this.jobPostingForm.value,
        requiredSkills: this.availableSkills
          .filter(skill => skill.selected)
          .map(skill => skill.name)
      };
      
      console.log('Job posting created:', formData);
      // Here you would typically send this data to your backend API
    } else {
      this.jobPostingForm.markAllAsTouched();
    }
  }

}
