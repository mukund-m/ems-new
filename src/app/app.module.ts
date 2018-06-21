// Modules 3rd party
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/aniMations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
         MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
         MatCardModule, MatTabsModule, MatIconModule, MatDatepickerModule, MatListModule, MatDividerModule, MatTableModule, MatTooltipModule, MatProgressSpinnerModule, MatAutocompleteModule, MatSelectModule, MatChipsModule } from '@angular/Material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
// Modules
import { MessagesModule } from './components/messages/messages.module';
import { PipesModule } from './pipes/pipes.module';
import { BlocksModule } from './components/blocks/blocks.module';
import { AuthModule } from './components/auth/auth.module';
import { BackgroundsModule } from './components/backgrounds/backgrounds.module';
import { ProfileModule } from './components/profile/profile.module';
import { MiscModule } from './components/misc/misc.module';
import { DataTablesModule } from 'angular-datatables';
// Shared
import {
  FooterComponent,
  HeaderComponent,
  UserService,
  AlertService,
  AuthGuardService,
  AuthService,
  WindowService,
  RestService
} from './components/shared';

// Main
import { AppComponent } from './app.component';
import { AppRoutingModule,
         // routingComponents
         } from './app.routing';

// Components
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';
import { EmailMeComponent } from './components/email-me/email-me.component';
import { StudentComponent } from './components/students/student/student.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { ParentFormComponent } from './components/students/parent-form/parent-form.component';
import { FeeFormComponent } from './components/students/fee-form/fee-form.component';
import { InstallmentComponent } from './components/students/installment/installment.component';
import { StudentViewComponent } from './components/students/student-view/student-view.component';
import { FeeDashboardComponent } from './components/students/fee-dashboard/fee-dashboard.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseFormComponent } from './components/courses/course-form/course-form.component';
import { StaffComponent } from './components/staff-details/staff/staff.component';
import { StaffListComponent } from './components/staff-details/staff-list/staff-list.component';
import { BranchListComponent } from './components/branch/branch-list/branch-list.component';
import { BranchFormComponent } from './components/branch/branch-form/branch-form.component';
import { CoursePickerComponent } from './components/common/course-picker/course-picker.component';
import { BranchPickerComponent } from './components/common/branch-picker/branch-picker.component';
import { SalaryFormComponent } from './components/staff-details/salary-form/salary-form.component';
import { SalaryListComponent } from './components/staff-details/salary-list/salary-list.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EmailMeComponent,
    StudentComponent,
    StudentFormComponent,
    ParentFormComponent,
    FeeFormComponent,
    InstallmentComponent,
    StudentViewComponent,
    FeeDashboardComponent,
    CourseListComponent,
    CourseFormComponent,
    StaffComponent,
    StaffListComponent,
    BranchListComponent,
    BranchFormComponent,
    CoursePickerComponent,
    BranchPickerComponent,
    SalaryFormComponent,
    SalaryListComponent,
    AdminDashboardComponent,
    // routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatDatepickerModule,MatDialogModule, MatListModule, MatDividerModule,MatTableModule,
    MatCardModule, MatTabsModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule,
    MatAutocompleteModule,MatSelectModule,MatChipsModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MessagesModule,
    PipesModule,
    BlocksModule,
    AuthModule,
    BackgroundsModule,
    ProfileModule,
    MiscModule,
    DataTablesModule
  ],
  providers: [
    UserService,
    AlertService,
    AuthGuardService,
    AuthService,
    WindowService,
    RestService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ParentFormComponent,
                    FeeFormComponent, InstallmentComponent, SalaryFormComponent]
})
export class AppModule {
}
