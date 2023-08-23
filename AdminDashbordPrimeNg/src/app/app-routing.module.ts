import { CVPlatformeComponent } from './consultor/dashboard-consultor/ResumeData/cvplatforme/cvplatforme.component';

import { ImageComponent } from './consultor/dashboard-consultor/image/image.component';
import { DashbordIndexComponent } from './consultor/dashboard-consultor/dashbord-index/dashbord-index.component';
import { FeaturesJobsComponent } from './consultor/landingPage/features-jobs/features-jobs.component';
import { DashboardConsultorComponent } from './consultor/dashboard-consultor/dashboard-consultor.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DialogComponent } from './consultor/landingPage/dialog/dialog.component';

import { ConsultorComponent } from './consultor/consultor.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './admin/layout/app.layout.component';
import { AppComponent } from './app.component';

import { IndexHomeComponent } from './consultor/landingPage/index-home/index-home.component';
import { ResumeComponent } from './consultor/dashboard-consultor/ResumeData/resume/resume.component';
import { SettingsComponent } from './consultor/dashboard-consultor/settings/settings.component';
import { FilesComponent } from './consultor/dashboard-consultor/files/files.component';
import { RequestPasswordResetComponent } from './auth/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileEntrepriseComponent } from './consultor/dashboard-consultor/entreprise/profile-entreprise/profile-entreprise.component';

import { AddProfileComponent } from './consultor/dashboard-consultor/entreprise/add-profile/add-profile.component';
import { EditProfileComponent } from './consultor/dashboard-consultor/entreprise/edit-profile/edit-profile.component';
import { ForbiddenComponent } from './consultor/forbidden/forbidden.component';
import { ProfileEntrepriseGuard } from './guards/profile-entreprise.guard';
import { JobOfferComponent } from './consultor/dashboard-consultor/job-offer/job-offer.component';
import { OfferDetailsComponent } from './consultor/dashboard-consultor/job-offer/offer-details/offer-details.component';
import { OfferInfoComponent } from './consultor/dashboard-consultor/job-offer/offer-info/offer-info.component';
import { OfferPlaceComponent } from './consultor/dashboard-consultor/job-offer/offer-place/offer-place.component';
import { OfferSettingsComponent } from './consultor/dashboard-consultor/job-offer/offer-settings/offer-settings.component';
import { OfferConfirmationComponent } from './consultor/dashboard-consultor/job-offer/offer-confirmation/offer-confirmation.component';
import { ListJobOfferComponent } from './consultor/dashboard-consultor/list-job-offer/list-job-offer.component';
import { ViewJobOfferComponent } from './consultor/dashboard-consultor/view-job-offer/view-job-offer.component';
import { EditJobOfferComponent } from './consultor/dashboard-consultor/edit-job-offer/edit-job-offer.component';
import { AddCategoryComponent } from './admin/components/add-category/add-category.component';
import { CategorylayoutComponent } from './admin/components/categorylayout/categorylayout.component';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { UserslayoutComponent } from './admin/components/userslayout/userslayout.component';
import { AdminJobOfferComponent } from './admin/components/admin-job-offer/admin-job-offer.component';
import { AdminOfferDetailsComponent } from './admin/components/admin-offer-details/admin-offer-details.component';
import { FullPageJobsComponent } from './consultor/landingPage/full-page-jobs/full-page-jobs.component';
import { HomeJobOfferDetailsComponent } from './consultor/landingPage/home-job-offer-details/home-job-offer-details.component';
import { AppliedOffersConsultantComponent } from './consultor/dashboard-consultor/applied-offers-consultant/applied-offers-consultant.component';
import { CompanyDetailsInAppliedOfferComponent } from './consultor/dashboard-consultor/company-details-in-applied-offer/company-details-in-applied-offer.component';
import { NotificationsComponent } from './consultor/notifications/notifications.component';
import { ListCandidatureComponent } from './consultor/dashboard-consultor/list-candidature/list-candidature.component';
import { UpdateCandidatureComponent } from './consultor/dashboard-consultor/update-candidature/update-candidature.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { ListUsersComponent } from './admin/components/list-users/list-users.component';
import { SingleConsultantDetailsComponent } from './consultor/landingPage/single-consultant-details/single-consultant-details.component';
import { AdvancedSearchComponent } from './consultor/landingPage/advanced-search/advanced-search.component';
import { FullPageConsultantsComponent } from './consultor/landingPage/full-page-consultants/full-page-consultants.component';
import { QuizListComponent } from './consultor/Quiz/quiz-list/quiz-list.component';
import { QuizUpdateComponent } from './consultor/Quiz/quiz-update/quiz-update.component';
import { QuizCreateComponent } from './consultor/Quiz/quiz-create/quiz-create.component';
import { QuestionCreationComponent } from './consultor/question-creation/question-creation.component';
import { AssignedQuizListComponent } from './consultor/Quiz/assigned-quiz-list/assigned-quiz-list.component';
import { QuizSimulationComponent } from './consultor/Quiz/quiz-simulation/quiz-simulation.component';
import { QuizResultsComponent } from './consultor/Quiz/quiz-results/quiz-results.component';
import { LoadingScreenComponent } from './consultor/Quiz/loading-screen/loading-screen.component';
import { ResultReportsComponent } from './consultor/Quiz/result-reports/result-reports.component';
import { AutoQuizComponent } from './consultor/Quiz/auto-quiz/auto-quiz.component';

const routes: Routes = [
  { path: "", redirectTo: "consultor", pathMatch: "full" },
  {
    path: 'consultor', component: ConsultorComponent,
  },
  {
    path: 'admin', component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'category', component: CategorylayoutComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'newcategory', component: AddCategoryComponent },
      { path: 'admins', component: UserslayoutComponent },
      { path: 'users', component: ListUsersComponent },
      { path: 'offers', component: AdminJobOfferComponent },
      { path: 'admin-offer-details/:id', component: AdminOfferDetailsComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  {
    path: 'home',
    component: IndexHomeComponent,
    children: [
      { path: 'full-page-jobs', component: FullPageJobsComponent },
      { path: 'home-job-offer-details/:id', component: HomeJobOfferDetailsComponent },
      {path : 'single-consultant-details/:id',component:SingleConsultantDetailsComponent},
      {path : 'advanced-search',component:AdvancedSearchComponent},
      {path :'full-page-consultants',component:FullPageConsultantsComponent}
    ]
  },

  {
    path: 'dashboardConsultor', component: DashboardConsultorComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', component: DashbordIndexComponent },
      { path: 'Resume', component: ResumeComponent },
      { path: 'Settings', component: SettingsComponent },
      { path: 'jobs', component: FeaturesJobsComponent },
      { path: 'image', component: ImageComponent },
      { path: 'file', component: FilesComponent },
      { path: 'CVplatforme', component: CVPlatformeComponent },
      {path: 'cv/:id',component: CVPlatformeComponent,},

      { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
      { path: 'quizzes', component: QuizListComponent },
      { path: 'assigned-quizzes', component: AssignedQuizListComponent },

      { path: 'quizzes/update/:id', component: QuizUpdateComponent }, // Define the route for the QuizUpdateComponent with a parameter named 'id'
      { path: 'quizzes/create', component: QuizCreateComponent },
      {
        path: 'quizzes/create-questions/:quizId', // Update the path for creating questions
        component: QuestionCreationComponent
      },
      { path: 'quiz-simulation/:id', component: QuizSimulationComponent },
      { path: 'loading', component: LoadingScreenComponent }, // Add this line

      { path: 'results', component: QuizResultsComponent }, // Add this line
      { path: 'result-reports', component: ResultReportsComponent },
      { path: 'AutoQuiz', component: AutoQuizComponent },



      



      { path: 'profile-entreprise', component: ProfileEntrepriseComponent, canActivate: [ProfileEntrepriseGuard] },
      { path: 'add-profile', component: AddProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
      { path: 'applied-offers-consultant', component: AppliedOffersConsultantComponent },
      { path: 'company-details-in-applied-offer/:id', component: CompanyDetailsInAppliedOfferComponent },
      { path: 'test', component: NotificationsComponent },
      {
        path: 'Job-offer',
        component: JobOfferComponent,
        children: [
          { path: '', redirectTo: 'offer-info', pathMatch: 'full' },
          { path: 'offer-info', component: OfferInfoComponent },
          { path: 'offer-details', component: OfferDetailsComponent },
          { path: 'offer-settings', component: OfferSettingsComponent },
          { path: 'offer-place', component: OfferPlaceComponent },
          { path: 'offer-confirmation', component: OfferConfirmationComponent },
        ],
      },
      { path: 'offer-list', component: ListJobOfferComponent },
      // new route for condatures 
      { path: 'list-candidature/:id', component: ListCandidatureComponent },
      { path: 'view-job-offer/:id', component: ViewJobOfferComponent },
      { path: 'edit-job-offer/:id', component: EditJobOfferComponent },
      { path: 'update-candidature', component: UpdateCandidatureComponent },



    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'request-password-reset', component: RequestPasswordResetComponent },
  { path: 'password-reset', component: ResetPasswordComponent },
  { path: 'forbidden', component: ForbiddenComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
