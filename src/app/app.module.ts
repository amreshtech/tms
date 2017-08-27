import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login/login.service';
import { LoggedInGuard } from 'app/logged-in.guard';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from 'app/signup/signup.service';
import { LogoutComponent } from './logout/logout.component';
import { TaskService } from 'app/task.service';
import {NgPipesModule} from 'ngx-pipes';
import { TaskCardComponent } from './task-card/task-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'home' }
]


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
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    HttpModule,
    NgPipesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, LoggedInGuard, SignupService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
