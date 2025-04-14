import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Skill {
  name: string;
  selected: boolean;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  proficiencyValue: number;
}

interface WorkExperience {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
}


@Component({
  selector: 'app-profile',
  imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  profileForm: FormGroup;
  currentStep = 1; // Starting with the Experience step as shown in the image
  totalSteps = 3;
  steps = ['Personal Info', 'Skills', 'Experience'];
  
  searchSkill = '';
  skills: Skill[] = [
    { name: 'JavaScript', selected: true, proficiency: 'Advanced', proficiencyValue: 85 },
    { name: 'React', selected: true, proficiency: 'Intermediate', proficiencyValue: 60 },
    { name: 'Node.js', selected: true, proficiency: 'Beginner', proficiencyValue: 30 }
  ];
  
  popularSkills = ['JavaScript', 'React', 'Node.js', 'Angular', 'TypeScript', 'HTML', 'CSS', 'Python'];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      professionalHeadline: ['', Validators.required],
      location: ['', Validators.required],
      profilePicture: [null],
      workExperiences: this.fb.array([
        this.createWorkExperienceForm()
      ])
    });
  }

  get workExperiences(): FormArray {
    return this.profileForm.get('workExperiences') as FormArray;
  }

  get selectedSkills(): any[] {
    return this.skills?.filter(s => s.selected) || [];
}

  createWorkExperienceForm(): FormGroup {
    return this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      isCurrentJob: [false]
    });
  }

  addWorkExperience(): void {
    this.workExperiences.push(this.createWorkExperienceForm());
  }

  removeWorkExperience(index: number): void {
    this.workExperiences.removeAt(index);
  }

  toggleCurrentJob(index: number): void {
    const experience = this.workExperiences.at(index) as FormGroup;
    const isCurrentJob = experience.get('isCurrentJob')?.value;
    
    if (isCurrentJob) {
      experience.get('endDate')?.setValue('Present');
      experience.get('endDate')?.disable();
    } else {
      experience.get('endDate')?.setValue('');
      experience.get('endDate')?.enable();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.profileForm.patchValue({
        profilePicture: file
      });
    }
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    if (this.profileForm.valid) {
      // Enable any disabled fields before submitting
      this.workExperiences.controls.forEach((control) => {
        if (control.get('isCurrentJob')?.value) {
          control.get('endDate')?.enable();
        }
      });
      
      console.log('Form submitted:', this.profileForm.value);
      console.log('Selected skills:', this.skills.filter(skill => skill.selected));
      // Implement your API call here to submit the form data
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
  
  toggleSkill(skill: Skill): void {
    skill.selected = !skill.selected;
  }
  
  addNewSkill(): void {
    if (this.searchSkill && !this.skills.some(s => s.name.toLowerCase() === this.searchSkill.toLowerCase())) {
      this.skills.push({
        name: this.searchSkill,
        selected: true,
        proficiency: 'Beginner',
        proficiencyValue: 30
      });
      this.searchSkill = '';
    }
  }
  
  updateProficiency(skill: Skill, value: number): void {
    skill.proficiencyValue = value;
    if (value < 33) {
      skill.proficiency = 'Beginner';
    } else if (value < 66) {
      skill.proficiency = 'Intermediate';
    } else {
      skill.proficiency = 'Advanced';
    }
  }
  
  getFilteredPopularSkills(): string[] {
    if (!this.searchSkill) return this.popularSkills;
    return this.popularSkills.filter(skill => 
      skill.toLowerCase().includes(this.searchSkill.toLowerCase()) &&
      !this.skills.some(s => s.name === skill)
    );
  }

}
