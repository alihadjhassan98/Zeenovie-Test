import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultorComponent } from './consultor.component';
import { IndexHomeComponent } from './landingPage/index-home/index-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BannerComponent } from './landingPage/banner/banner.component';
import { ContentComponent } from './landingPage/content/content.component';
import { FeaturesCityComponent } from './landingPage/features-city/features-city.component';
import { FeaturesJobsComponent } from './landingPage/features-jobs/features-jobs.component';
import { FooterComponent } from './landingPage/footer/footer.component';
import { HeaderComponent } from './landingPage/header/header.component';
import { HighestFreelancerComponent } from './landingPage/highest-freelancer/highest-freelancer.component';
import { LoginComponent } from '../auth/login/login.component';
import { MembershipPlansComponent } from './landingPage/membership-plans/membership-plans.component';
import { DialogComponent } from './landingPage/dialog/dialog.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HeaderLoggedOutComponent } from './landingPage/header/header-logged-out/header-logged-out.component';
import { HeaderLoggedInComponent } from './landingPage/header/header-logged-in/header-logged-in.component';
import { RequestPasswordResetComponent } from '../auth/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ToastModule } from 'primeng/toast';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { FullPageJobsComponent } from './landingPage/full-page-jobs/full-page-jobs.component';
import { HomeJobOfferDetailsComponent } from './landingPage/home-job-offer-details/home-job-offer-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {SkeletonModule} from 'primeng/skeleton';
import { SingleConsultantDetailsComponent } from './landingPage/single-consultant-details/single-consultant-details.component';
import { SharedPipeModule } from '../pipes/shared-pipe.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecommandedJobsForConsultantsComponent } from './landingPage/recommanded-jobs-for-consultants/recommanded-jobs-for-consultants.component';
import { AdvancedSearchComponent } from './landingPage/advanced-search/advanced-search.component';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { FullPageConsultantsComponent } from './landingPage/full-page-consultants/full-page-consultants.component';
import { QuizListComponent } from './Quiz/quiz-list/quiz-list.component';
import { QuizUpdateComponent } from './Quiz/quiz-update/quiz-update.component';
import { QuizCreateComponent } from './Quiz/quiz-create/quiz-create.component';
import { QuestionCreationComponent } from './question-creation/question-creation.component';
import { AssignedQuizListComponent } from './Quiz/assigned-quiz-list/assigned-quiz-list.component';
import { QuizSimulationComponent } from './Quiz/quiz-simulation/quiz-simulation.component';
import { QuizResultsComponent } from './Quiz/quiz-results/quiz-results.component';
import { LoadingScreenComponent } from './Quiz/loading-screen/loading-screen.component';
import { ResultReportsComponent } from './Quiz/result-reports/result-reports.component';
import { AutoQuizComponent } from './Quiz/auto-quiz/auto-quiz.component';


const config: SocketIoConfig = { url: 'ws://localhost:3011', options: {} };

@NgModule({
  declarations: [
    ConsultorComponent,
    IndexHomeComponent,
    FooterComponent,
    BannerComponent,
    ContentComponent,
    FeaturesJobsComponent,
    FeaturesCityComponent,
    HighestFreelancerComponent,
    MembershipPlansComponent,
    LoginComponent,
    DialogComponent,
    RegisterComponent,
    HeaderLoggedOutComponent,
    HeaderLoggedInComponent,
    HeaderComponent,
    ResetPasswordComponent,
    RequestPasswordResetComponent,
    ForbiddenComponent,
    FullPageJobsComponent,
    HomeJobOfferDetailsComponent,
    NotificationsComponent,
    SingleConsultantDetailsComponent,
    RecommandedJobsForConsultantsComponent,
    AdvancedSearchComponent,
    FullPageConsultantsComponent,
    QuizListComponent,
    QuizUpdateComponent,
    QuizCreateComponent,
    QuestionCreationComponent,
    AssignedQuizListComponent,
    QuizSimulationComponent,
    QuizResultsComponent,
    LoadingScreenComponent,
    ResultReportsComponent,
    AutoQuizComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    PaginatorModule,
    CarouselModule,
    ButtonModule,
    RatingModule,
    SharedPipeModule,
    SkeletonModule,
    ListboxModule,
    CardModule,
    BrowserAnimationsModule,
    
    SocketIoModule.forRoot(config)
  ]

})
export class ConsultorModule { }
