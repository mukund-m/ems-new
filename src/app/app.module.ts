// Modules 3rd party
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/aniMations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
         MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
         MatCardModule, MatTabsModule, MatIconModule, MatDatepickerModule, MatListModule, MatDividerModule, MatTableModule, MatTooltipModule, MatProgressSpinnerModule, MatAutocompleteModule, MatSelectModule, MatChipsModule, MatSlideToggleModule } from '@angular/Material';
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
import { AdminDashboardTopCardsComponent } from './components/dashboards/admin-dashboard-top-cards/admin-dashboard-top-cards.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyTableComponent } from './components/my-table/my-table.component';
​import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FeeMonthlyTrendComponent } from './components/students/fee-dashboard-items/fee-monthly-trend/fee-monthly-trend.component';
import { PendingPaymentsComponent } from './components/students/fee-dashboard-items/pending-payments/pending-payments.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ExamListComponent } from './components/exam/exam-list/exam-list.component';
import { ExamDetailsComponent } from './components/exam/exam-details/exam-details.component';
import { StudentMarkRecorderComponent } from './components/exam/student-mark-recorder/student-mark-recorder.component';
import { AttendanceRecorderComponent } from './components/attendance/attendance-recorder/attendance-recorder.component';
import { AttendanceViewerComponent } from './components/attendance/attendance-viewer/attendance-viewer.component';
import { EnquiryListComponent } from './components/enquiry/enquiry-list/enquiry-list.component';
import { EnquiryFormComponent } from './components/enquiry/enquiry-form/enquiry-form.component';
import { StaffAttendanceRecorderComponent } from './components/attendance/staff-attendance-recorder/staff-attendance-recorder.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MomentModule } from 'angular2-moment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { ExportService } from './components/shared/services/export.service';
import { StudentService } from './components/shared/services/student.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

var firebaseConfig = {
  apiKey: "AIzaSyD5AKEKgvkHKhlsBOCKKpQU5Tr7mTiSUvI",
  authDomain: "user-management-da33b.firebaseapp.com",
  databaseURL: "https://user-management-da33b.firebaseio.com",
  projectId: "user-management-da33b",
  storageBucket: "user-management-da33b.appspot.com",
  messagingSenderId: "216819439593"
};

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
    AdminDashboardTopCardsComponent,
    MyTableComponent,
    FeeMonthlyTrendComponent,
    PendingPaymentsComponent,
    NotificationsComponent,
    ExamListComponent,
    ExamDetailsComponent,
    StudentMarkRecorderComponent,
    AttendanceRecorderComponent,
    AttendanceViewerComponent,
    EnquiryListComponent,
    EnquiryFormComponent,
    EnquiryFormComponent,
    StaffAttendanceRecorderComponent,
    // routingComponents
  ],
  imports: [
    BrowserModule,
    MomentModule,
    AmazingTimePickerModule,
    BrowserAnimationsModule,
    Ng2TableModule,
    PaginationModule.forRoot() ,
    
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatDatepickerModule,MatDialogModule, MatListModule, MatDividerModule,MatTableModule,
    MatCardModule, MatTabsModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule,
    MatAutocompleteModule,MatSelectModule,MatChipsModule, MatSlideToggleModule,
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
    PerfectScrollbarModule,
    NgxDatatableModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig, 'angularfs'),
    AngularFirestoreModule
    
  ],
  providers: [
    UserService,
    AlertService,
    AuthGuardService,
    AuthService,
    WindowService,
    ExportService,
    StudentService,
    RestService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ParentFormComponent,
                    FeeFormComponent, InstallmentComponent, SalaryFormComponent,
                  PendingPaymentsComponent]
})
export class AppModule {
}
