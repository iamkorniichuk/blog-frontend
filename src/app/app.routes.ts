import { Routes } from '@angular/router';

import { tutorialResolver } from './shared/tutorial-resolver';
import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page';
import { TutorialListPageComponent } from './pages/tutorial-list-page/tutorial-list-page';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: TutorialListPageComponent,
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: ':id',
    component: TutorialPageComponent,
    resolve: { tutorial: tutorialResolver },
  },
];
