import { Routes } from '@angular/router';

import { tutorialResolver } from './shared/tutorial-resolver';

import { HomePageComponent } from './pages/home-page/home-page';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page';
import { ContactPageComponent } from './pages/contact-page/contact-page';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page';
import { CookiesPolicyPageComponent } from './pages/cookies-policy-page/cookies-policy-page';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page';
import { ToolsListPageComponent } from './pages/tools-list-page/tools-list-page';
import { ImageUpscalePageComponent } from './pages/image-upscale-page/image-upscale-page';
import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page';
import { TutorialListPageComponent } from './pages/tutorial-list-page/tutorial-list-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'privacy',
    component: PrivacyPolicyPageComponent,
  },
  {
    path: 'cookies',
    component: CookiesPolicyPageComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: 'tools',
    component: ToolsListPageComponent,
  },
  {
    path: 'tools/image-upscale',
    component: ImageUpscalePageComponent,
  },
  {
    path: 'tutorials',
    component: TutorialListPageComponent,
  },
  {
    path: 'tutorials/:id',
    component: TutorialPageComponent,
    resolve: { tutorial: tutorialResolver },
  },
];
