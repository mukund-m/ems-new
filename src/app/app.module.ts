// Modules 3rd party
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/aniMations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
         MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
         MatCardModule, MatTabsModule, MatIconModule } from '@angular/Material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    StudentFormComponent
    // routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatCardModule, MatTabsModule, MatIconModule,
    FormsModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
