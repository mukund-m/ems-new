// Modules 3rd party
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main
import { AppComponent } from './app.component';

// 404 page
import { PageNotFoundComponent } from './components/not-found/not-found.component';

// Pages
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { MiscComponent } from './components/misc/misc.component';

// Components
import { SignupComponent } from './components/auth/signup.component';
import { SigninComponent } from './components/auth/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings.component';
import { MessagesComponent } from './components/messages/messages.component';

// Protected
import { AuthGuardService } from './components/shared';
import { StudentComponent } from 'app/components/students/student/student.component';
import { StudentFormComponent } from 'app/components/students/student-form/student-form.component';
import { StudentViewComponent } from 'app/components/students/student-view/student-view.component';
import { FeeDashboardComponent } from 'app/components/students/fee-dashboard/fee-dashboard.component';
import { CourseListComponent } from 'app/components/courses/course-list/course-list.component';
import { CourseFormComponent } from 'app/components/courses/course-form/course-form.component';
import { StaffListComponent } from 'app/components/staff-details/staff-list/staff-list.component';
import { StaffComponent } from 'app/components/staff-details/staff/staff.component';
import { BranchListComponent } from 'app/components/branch/branch-list/branch-list.component';
import { BranchFormComponent } from 'app/components/branch/branch-form/branch-form.component';

// Routing
const appRoutes: Routes = [

  // Public pages
  { path: '', redirectTo: '/home', pathMatch : 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'misc', component: MiscComponent },
  // { path: 'misc', loadChildren: './components/misc/misc.module#MiscModule' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },

  // Protected pages
  // { path: 'profile/:uid/:name', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuardService] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService] },
  { path: 'students', component: StudentComponent },
  { path: 'student-view', component: StudentViewComponent },
  { path: 'student-form', component: StudentFormComponent },
  { path: 'fee-dashboard', component: FeeDashboardComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'course-form', component: CourseFormComponent },
  
  { path: 'staffs', component: StaffListComponent },
  { path: 'staff-form', component: StaffComponent },
  { path: 'branches', component: BranchListComponent },
  { path: 'branch-form', component: BranchFormComponent },
  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
