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
import { GoogleLoginComponent } from './google-login/google-login.component';
import { UserService } from 'app/user.service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'google', component: GoogleLoginComponent },
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
    GoogleLoginComponent,
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
    AutoCompleteModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, LoggedInGuard, SignupService, TaskService, AuthService, AngularFireDatabase, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
