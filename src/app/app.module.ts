import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgPipesModule } from 'ngx-pipes';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login/login.service';
import { LoggedInGuard } from 'app/logged-in.guard';
import { CreateTaskComponent } from './create-task/create-task.component';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from 'app/signup/signup.service';
import { LogoutComponent } from './logout/logout.component';
import { TaskService } from 'app/task.service';
import { AuthService } from 'app/auth.service';
import { UserService } from 'app/user.service';
import {CheckboxModule} from 'primeng/primeng';
import { OpenPipe } from './open.pipe';
import { AllTaskAssignedToYouComponent } from './all-task-assigned-to-you/all-task-assigned-to-you.component';
import { AllTaskAssignedByYouComponent } from './all-task-assigned-by-you/all-task-assigned-by-you.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import {DropdownModule} from 'primeng/primeng';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'home' }
]

export const firebaseConfig = {
  apiKey: 'AIzaSyDENbZKofOE9gmxNw42hrt4J0CFCSoz7aQ',
  authDomain: 'tms-project-angular.firebaseapp.com',
  databaseURL: 'https://tms-project-angular.firebaseio.com',
  projectId: 'tms-project-angular',
  storageBucket: 'tms-project-angular.appspot.com',
  messagingSenderId: '852899847815'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CreateTaskComponent,
    SignupComponent,
    LogoutComponent,
    OpenPipe,
    AllTaskAssignedToYouComponent,
    AllTaskAssignedByYouComponent,
    AllTasksComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    HttpModule,
    NgPipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CheckboxModule,
    DropdownModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, LoggedInGuard, SignupService, TaskService, AuthService, AngularFireDatabase, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
