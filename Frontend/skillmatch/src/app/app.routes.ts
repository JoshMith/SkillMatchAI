import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegJobseekerComponent } from './auth/reg-jobseeker/reg-jobseeker.component';
import { LoginComponent } from './auth/login/login.component';
import { CareerPathsComponent } from './career-paths/career-paths.component';
import { SkillAssessComponent } from './skill-assess/skill-assess.component';
import { EmployerDashComponent } from './dashboard/employer-dash/employer-dash.component';
import { JobseekerDashComponent } from './dashboard/jobseeker-dash/jobseeker-dash.component';
import { JobpostsComponent } from './jobposts/jobposts.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ApplyComponent } from './apply/apply.component';
import { AboutComponent } from './home/about/about.component';
import { GetMatchedComponent } from './get-matched/get-matched.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { RegEmployerComponent } from './auth/reg-employer/reg-employer.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'reg-jobseeker', component: RegJobseekerComponent },
    { path: 'reg-employer', component: RegEmployerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'career-path', component: CareerPathsComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'skill-assessment', component: SkillAssessComponent },
    { path: 'employer-dashboard', component: EmployerDashComponent },
    { path: 'jobseeker-dashboard', component: JobseekerDashComponent },
    { path: 'jobposts', component: JobpostsComponent },
    { path: 'chatbot', component: ChatbotComponent },
    { path: 'about', component: AboutComponent },
    { path: 'get-matched', component: GetMatchedComponent },
    { path: 'apply', component: ApplyComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'profile', component: ProfileComponent }


];
