import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isCandidateList?: boolean;
  candidates?: Candidate[];
}

interface Candidate {
  name: string;
  level: string;
  rating: string;
  experience: string;
}


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  
  currentQuestion: string = '';
  chatMessages: ChatMessage[] = [];
  isLoading: boolean = false;
  sidebarItems = [
    { name: 'Dashboard', active: false },
    { name: 'Company Profile', active: false },
    { name: 'Job Postings', active: false },
    { name: 'Candidate Matches', active: false },
    { name: 'Applications', active: false },
    { name: 'Interviews', active: false },
    { name: 'AI Assistance', active: true },
    { name: 'Analytics', active: false }
  ];
  
  constructor() { }
  
  ngOnInit(): void {
    // Add initial welcome message
    this.chatMessages.push({
      text: 'Hello! How can I help you find candidates today?',
      isUser: false,
      timestamp: new Date(new Date().setHours(10, 30))
    });
  }
  
  sendMessage(): void {
    if (this.currentQuestion.trim() === '') return;
    
    // Add user message to chat
    this.chatMessages.push({
      text: this.currentQuestion,
      isUser: true,
      timestamp: new Date()
    });
    
    // Save question and clear input
    const question = this.currentQuestion;
    this.currentQuestion = '';
    
    // Simulate loading
    this.isLoading = true;
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      this.handleResponse(question);
      this.isLoading = false;
      
      // Scroll to bottom after response is added
      setTimeout(() => this.scrollToBottom(), 0);
    }, 3000);
    
    // Scroll to bottom immediately after sending
    setTimeout(() => this.scrollToBottom(), 0);
  }
  
  handleResponse(question: string): void {
    // In a real app, this would call your AI service
    if (question.toLowerCase().includes('react') || 
        question.toLowerCase().includes('reactjs') ||
        question.toLowerCase().includes('react.js')) {
      
      // Add the list of candidates as a special message type
      this.chatMessages.push({
        text: 'I found 7 candidates with React.js skills:',
        isUser: false,
        timestamp: new Date(),
        isCandidateList: true,
        candidates: [
          { name: 'John Doe', level: 'Expert', rating: '8/10', experience: '5 years experience' },
          { name: 'Sarah Smith', level: 'Advanced', rating: '7/10', experience: '3 years experience' },
          { name: 'Mike Johnson', level: 'Expert', rating: '9/10', experience: '6 years experience' }
        ]
      });
    } else {
      // Generic response for other questions
      this.chatMessages.push({
        text: 'I can help you find candidates based on specific skills, experience levels, or other criteria. What kind of candidates are you looking for?',
        isUser: false,
        timestamp: new Date()
      });
    }
  }
  
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  viewAllMatches(): void {
    console.log('Navigating to view all matches');
    // In a real app, you would navigate to the full list of matches
    // this.router.navigate(['/candidates', 'react-js']);
  }
}
