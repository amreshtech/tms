import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login/login.service';
import { LoggedInGuard } from 'app/logged-in.guard';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  { path: 'login', component: LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSemanticModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
